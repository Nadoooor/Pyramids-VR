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
    camPos.add(forward.multiplyScalar(-1));

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