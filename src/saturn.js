import * as THREE from 'three';
import "./style.css";
import saturnTexture from './SaturnTexture.jpg';
import skyBox from './SkyBox.jpg';
import ringTexture from './RingsTexture.png';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import moon1 from './TitanTexture.jpg';
import moon2 from './EnceladusTexture.jpg';
import gsap from "gsap";
let scene, camera, renderer, controls;
function makeAScene(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
    camera.position.set(0, 0, 30);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.domElement.classList.add("smallArea");
    let pageBody = document.querySelector("body");
    let renderContainer = document.createElement("div");
    renderContainer.classList.add("smallArea");
    pageBody.appendChild(renderContainer);
    renderContainer.appendChild(renderer.domElement);
    //.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    const loader = new THREE.TextureLoader();

    //* SaturnTexture 
    const planetTexture = loader.load(saturnTexture);
    planetTexture.colorSpace = THREE.SRGBColorSpace;
    const saturnMaterial = new THREE.MeshStandardMaterial({
        map: planetTexture,

    });
    //* SkyboxTexture
    const skyBoxTexture = loader.load(skyBox);
    skyBoxTexture.colorSpace = THREE.SRGBColorSpace;
    const skyBoxMaterial = new THREE.MeshBasicMaterial({
        map: skyBoxTexture,
        side: THREE.BackSide 
    });
    //* RingsTexture
    const planetRingTexture = loader.load(ringTexture);
    planetRingTexture.colorSpace = THREE.SRGBColorSpace;
    const ringMaterial = new THREE.MeshBasicMaterial({
        map: planetRingTexture,
        side: THREE.DoubleSide,
        });

  //* TitanTexture
    const moonTexture1 = loader.load(moon1);
    moonTexture1.colorSpace = THREE.SRGBColorSpace;
    const moonMaterial1 = new THREE.MeshPhysicalMaterial({
        map: moonTexture1,
        side: THREE.DoubleSide
    });


    //* EnceladusTexture
    const moonTexture2 = loader.load(moon2);
    moonTexture2.colorSpace = THREE.SRGBColorSpace;
    const moonMaterial2 = new THREE.MeshPhysicalMaterial({
        map: moonTexture2,
        side: THREE.DoubleSide
    });


     //*mkaing sphere for skybox
    const radiusBig = 300;  
    const widthSegmentsBig = 200;  
    const heightSegmentsBig = 200;  
    const saturnGeomBig = new THREE.SphereGeometry(radiusBig, widthSegmentsBig, heightSegmentsBig);
    const saturnBig = new THREE.Mesh(saturnGeomBig, skyBoxMaterial);
    scene.add(saturnBig);
    //* making rings with ring geometry



 //*mkaing sphere for saturn
    const radius = 10;  
    const widthSegments = 100;  
    const heightSegments = 100;  
    const saturnGeom = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const saturn = new THREE.Mesh(saturnGeom, saturnMaterial);
    scene.add(saturn);
    //* making rings with ring geometry

    const innerRadius = 11; 
    const outerRadius = 18.0;
    const thetaSegments = 128;
    const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments);
    ringGeometry.rotateX(Math.PI / 2);
    const rings = new THREE.Mesh(ringGeometry, ringMaterial);
    rings.rotation.z = Math.PI / 1.07;
    rings.material.transparent = true;
    rings.material.opacity = 0.85;
    scene.add(rings);

    //* making moon gemometry

    const moon1Radius = 1.5;  
    const moon1WidthSegments = 64;  
    const moon1HeightSegments = 64;  
    const moonGeom1 = new THREE.SphereGeometry(moon1Radius, moon1WidthSegments, moon1HeightSegments);
    const titan = new THREE.Mesh(moonGeom1, moonMaterial1);
    scene.add(titan);

    const moon2Radius = 1.0;  
    const moon2WidthSegments = 64;  
    const moon2HeightSegments = 64;  
    const moonGeom2 = new THREE.SphereGeometry(moon2Radius, moon2WidthSegments, moon2HeightSegments);
    const enceladus = new THREE.Mesh(moonGeom2, moonMaterial2);
    scene.add(enceladus);

    enceladus.position.set(25, 0, 0);  
    titan.position.set(-25, 5, 0);



     //* Saturn rotation
    gsap.to(saturn.rotation, { 
        duration: 20, 
        y: "+=" + Math.PI * 2,   // full spin
        repeat: -1, 
        ease: "none" 
    });

    //* Rings rotation
    gsap.to(rings.rotation, { 
        duration: 20, 
        y: "-=" + Math.PI * 2,   // opposite direction
        repeat: -1, 
        ease: "none" 
    });

    //* titan rotation
    gsap.to(titan.rotation, { 
        duration: 15, 
        y: "+=" + Math.PI * 2, 
        repeat: -1, 
        ease: "none" 
    });

    //* enceladus rotation
    gsap.to(enceladus.rotation, { 
        duration: 18, 
        y: "+=" + Math.PI * 2, 
        repeat: -1, 
        ease: "none" 
    });

    //* lighting
    const light = new THREE.AmbientLight(0xFFFFFF, 3);
    light.position.set(-1, 2, 4);
    scene.add(light);
    renderer.setAnimationLoop(animate);
}
function animate(time){
    controls.update();
    time *= 0.001;  // convert time to seconds
    renderer.render(scene, camera);
}

export {makeAScene};