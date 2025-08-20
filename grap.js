AFRAME.registerComponent('gaze-drag', {
  init: function () {
    this.isDragging = false;
    this.camera = document.querySelector('#camera');

    this.el.addEventListener('click', () => {
      const body = this.el.body;
      if (!body || !this.camera) return;

      this.isDragging = !this.isDragging;

      if (this.isDragging) {
        // Disable gravity while holding
        body.setGravity(new Ammo.btVector3(0, 0, 0));
        body.activate();
        console.log('🔒 Grabbed');
      } else {
        // Restore gravity on release
        body.setGravity(new Ammo.btVector3(0, -9.8, 0));
        body.activate();
        console.log('🪂 Dropped');
      }
    });
  },

  tick: function () {
    if (!this.isDragging) return;

    const cam = this.camera;
    const body = this.el.body;
    if (!cam || !body) return;

    // Get camera position and rotation
    const camPos = new THREE.Vector3();
    cam.object3D.getWorldPosition(camPos);

    const camQuat = new THREE.Quaternion();
    cam.object3D.getWorldQuaternion(camQuat);

    // Offset object slightly in front
    const forward = new THREE.Vector3();
    cam.object3D.getWorldDirection(forward);
    camPos.add(forward.multiplyScalar(-2));

    // Apply transform to physics body
    const transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(camPos.x, camPos.y, camPos.z));
    transform.setRotation(new Ammo.btQuaternion(camQuat.x, camQuat.y, camQuat.z, camQuat.w));

    body.setWorldTransform(transform);
    body.activate();

    // Sync visual mesh
    this.el.object3D.position.copy(camPos);
    this.el.object3D.quaternion.copy(camQuat);
  }
});

AFRAME.registerComponent('trig', {
  init: function () {
    // Entity references
    this.hunter = document.querySelector('#SnakeHunter1');
    this.pad = document.querySelector('#SnakePad1');
    this.board = document.querySelector('#SnakeBoard1');
    this.current = document.querySelector('#current1');
    this.hunterimg = document.querySelector('#hunterimg');
    this.padimg = document.querySelector('#padimg');
    this.boardimg = document.querySelector('#boardimg');
    this.currentimg = document.querySelector('#currentimg');
    this.huntertxt = document.querySelector('#huntertxt');
    this.padtxt = document.querySelector('#padtxt');
    this.boardtxt = document.querySelector('#boardtxt');
    this.currenttxt = document.querySelector('#currenttxt');
    this.patr = document.querySelector('#patr');
    this.patr2 = document.querySelector('#patr2');
    this.inst = document.querySelector('#instruction');
    this.patr.setAttribute('visible', false);
    this.patr2.setAttribute('visible', false);
    this.inst.setAttribute('visible', true);

  this.boardimg.setAttribute('visible', false);
  this.hunterimg.setAttribute('visible', false);
  this.padimg.setAttribute('visible', false);
  this.currentimg.setAttribute('visible', false);
  this.boardtxt.setAttribute('visible', false);
  this.huntertxt.setAttribute('visible', false);
  this.padtxt.setAttribute('visible', false);
  this.currenttxt.setAttribute('visible', false);

    // Listen for collision start
    this.el.addEventListener('obbcollisionstarted', (e) => {
      const collidedWith = e.detail.withEl;

      if (collidedWith === this.hunter) {
        this.hunterimg.setAttribute('visible', true);
        this.huntertxt.setAttribute('visible', true);
        this.patr.setAttribute('visible', true);
        this.patr2.setAttribute('visible', true);
        this.inst.setAttribute('visible', false);

        console.log('Collided with Hunter');
      } else if (collidedWith === this.pad) {
        this.padimg.setAttribute('visible', true);
        this.padtxt.setAttribute('visible', true);
        this.patr.setAttribute('visible', true);
    this.patr2.setAttribute('visible', true);
            this.inst.setAttribute('visible', false);


        console.log('Collided with Pad');
      } else if (collidedWith === this.board) {
        this.boardimg.setAttribute('visible', true);
        this.boardtxt.setAttribute('visible', true);
        this.patr.setAttribute('visible', true);
        this.patr2.setAttribute('visible', true);
                this.inst.setAttribute('visible', false);

        console.log('Collided with Board');
      }else if (collidedWith === this.current) {
        this.currentimg.setAttribute('visible', true);
        this.currenttxt.setAttribute('visible', true);
        this.patr.setAttribute('visible', true);
        this.patr2.setAttribute('visible', true);
                this.inst.setAttribute('visible', false);

        console.log('Collided with Current');
      }
    });

this.el.addEventListener('obbcollisionended', (e) => {
  this.boardimg.setAttribute('visible', false);
  this.hunterimg.setAttribute('visible', false);
  this.padimg.setAttribute('visible', false);
  this.currentimg.setAttribute('visible', false);
  this.patr2.setAttribute('visible', false);
  this.patr.setAttribute('visible', false);
  this.boardtxt.setAttribute('visible', false);
  this.huntertxt.setAttribute('visible', false);
  this.padtxt.setAttribute('visible', false);
  this.currenttxt.setAttribute('visible', false);
  this.inst.setAttribute('visible', true);


});
  },

});
