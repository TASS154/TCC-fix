import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-test-ar',
  templateUrl: './teste-ar.page.html',
  styleUrls: ['./teste-ar.page.scss'],
  standalone: false
})
export class TesteARPage implements OnInit, OnDestroy {
  @ViewChild('webglCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private xrSession?: XRSession;
  private xrRefSpace?: XRReferenceSpace;
  private cube!: THREE.Mesh;

  isARActive = false;

  // Para controle de orientação
  private orientation = new THREE.Euler(0, 0, 0, 'YXZ');

  ngOnInit() {
    this.initThreeJS();
    this.setupDeviceOrientation();
  }

  ngOnDestroy() {
    this.cleanup();
  }

  private initThreeJS() {
    const canvas = this.canvasRef.nativeElement;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.xr.enabled = true;

    // Cena
    this.scene = new THREE.Scene();

    // Câmera (será sobrescrita pelo WebXR)
    this.camera = new THREE.PerspectiveCamera(70, 1, 0.01, 100);
    this.camera.position.set(0, 1.6, 0);

    // Cubo
    const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const material = new THREE.MeshStandardMaterial({ color: 0xff6347 }); // tomato
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.set(0, 1.6, -1); // 1 metro à frente
    this.scene.add(this.cube);

    // Luz
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    this.scene.add(light);

    // Resize
    const onResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);
    onResize();
  }

  private setupDeviceOrientation() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (event) => {
        if (!event.alpha || !event.beta || !event.gamma) return;

        const alpha = event.alpha! * (Math.PI / 180);
        const beta = event.beta! * (Math.PI / 180);
        const gamma = event.gamma! * (Math.PI / 180);

        // Ajuste para orientação portrait
        this.orientation.set(beta, alpha, -gamma, 'YXZ');

        if (this.cube && !this.isARActive) {
          // Modo preview (sem AR): rotaciona cubo com o celular
          this.cube.quaternion.setFromEuler(this.orientation);
        }
      });
    }
  }

  async startAR() {
    if (!navigator.xr) {
      alert('WebXR não suportado neste dispositivo.');
      return;
    }

    try {
      const session = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay'],
        domOverlay: { root: document.body }
      });

      this.xrSession = session;
      this.isARActive = true;

      await this.renderer.xr.setSession(session);
      this.xrRefSpace = await session.requestReferenceSpace('viewer');

      // Hit test (opcional: tocar na tela para posicionar)
      this.setupHitTest(session);

      // Animação
      this.renderer.setAnimationLoop(this.render.bind(this));

    } catch (error) {
      console.error('Erro ao iniciar AR:', error);
      alert('Não foi possível iniciar AR. Verifique se está em HTTPS e em um dispositivo compatível.');
      this.isARActive = false;
    }
  }

  private setupHitTest(session: XRSession) {
    let hitTestSource: XRHitTestSource | null = null;

    session.requestReferenceSpace('viewer').then((refSpace) => {
      session.requestHitTestSource?.({ space: refSpace })?.then((source) => {
        hitTestSource = source;
      });
    });

    session.addEventListener('select', (event) => {
      if (!hitTestSource || !this.xrRefSpace) return;

      const frame = event.frame;
      const hitTestResults = frame.getHitTestResults(hitTestSource);

      if (hitTestResults.length > 0) {
        const hitPose = hitTestResults[0].getPose(this.xrRefSpace);
        if (hitPose) {
          this.cube.position.set(
            hitPose.transform.position.x,
            hitPose.transform.position.y + 0.15, // + altura do cubo/2
            hitPose.transform.position.z
          );
          this.cube.visible = true;
        }
      }
    });
  }

  private render(time: number, frame: XRFrame) {
    if (!frame || !this.xrSession || !this.xrRefSpace) return;

    const pose = frame.getViewerPose(this.xrRefSpace);
    if (pose) {
      // Oculte o botão quando em AR
      const button = document.querySelector('.ar-button');
      if (button) button.remove();

      // Atualiza câmera com pose do WebXR
      const xrCamera = this.renderer.xr.getCamera();
      xrCamera.matrix.fromArray(pose.views[0].transform.matrix);
      xrCamera.updateMatrixWorld(true);
    }

    // Rotaciona o cubo com orientação do dispositivo (mesmo em AR)
    this.cube.quaternion.setFromEuler(this.orientation);

    this.renderer.render(this.scene, this.renderer.xr.getCamera());
  }

  private cleanup() {
    if (this.xrSession) {
      this.xrSession.end();
    }
    this.renderer.setAnimationLoop(null);
    this.renderer.dispose();
  }
}
