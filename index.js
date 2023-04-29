// AFRAME.registerComponent('wasd-movement', {
//    init: function () {
//      this.el.addEventListener('componentchanged', function (evt) {
//        if (evt.detail.name === 'position') {
//          console.log("Position: ", this.getAttribute('position'));
//        }
//      });
//    }
//  });

localStorage.clear();


AFRAME.registerComponent('collider', {
   init: function () {
      this.el.addEventListener('collide', function (e) {

         const idTrigger = e.detail.body.el.id;
         const trg = e.detail.body.el; // o seleccione el elemento que tenga el ancho que desea obtener
         const trgAudio = trg.getAttribute('audio');
         const trgOpc1 = trg.getAttribute('opc1');
         const trgOpc2 = trg.getAttribute('opc2');
         const post1 = trg.getAttribute('post1');
         const post2 = trg.getAttribute('post2');
         let rt = trg.getAttribute('rotation');
         const rt2 = trg.getAttribute('rt');
         const src1 = trg.getAttribute('src1');
         const src2 = trg.getAttribute('src2');
         const depth = trg.getAttribute('depth1');
         const nMuro = trg.getAttribute('nMuro');
         const rspTyp1 = trg.getAttribute('rspTyp1');
         const rspTyp2 = trg.getAttribute('rspTyp2');

         //Wall 
         const postW = trg.getAttribute('postW');
         const rotationW = trg.getAttribute('rtW');
         const depthW = trg.getAttribute('depthW');
         const widthW = trg.getAttribute('widthW');
         const heightW = trg.getAttribute('heightW');

         rt = (rt2 == null ? rt : rt2)


         const triggerArgs = {
            'trigger': [trgAudio, trgOpc1, trgOpc2, post1, post2, postW, rt, rotationW, src1, src2, depth, depthW, nMuro, rspTyp1, rspTyp2, widthW, heightW]
         };
         const triggers = {

            'trigger': (trgAudio, trgOpc1, trgOpc2, post1, post2, postW, rt, rotationW, src1, src2, depth, depthW, nMuro, rspTyp1, rspTyp2, widthW, heightW) => {

               newOpci(trgOpc1, trgOpc2, post1, rt, src1, depth, nMuro, rspTyp1)
               newOpci(trgOpc1, trgOpc2, post2, rt, src2, depth, nMuro, rspTyp2)
               newWall(nMuro, postW, (rotationW == null ? rt : rotationW), depthW, widthW, heightW);
               console.log(trgAudio)
               let audio = document.querySelector("#" + trgAudio);
               audio.play();
               e.detail.body.el.parentNode.removeChild(e.detail.body.el);
            }

         }
         triggers[idTrigger] ? triggers[idTrigger](...triggerArgs[idTrigger]) : null;
      });
   }
})

function empezar() {
   var player = document.querySelector("#player");
   player.setAttribute("position", "0 0 -1");
   var luz = document.querySelector("#luz");
   luz.setAttribute("light", "intensity: 1");
}

let contador = 0;

function bien(opcion1, opcion2, nMuro, sceneEl) {
   let muro = document.querySelector("#muro" + nMuro);
   muro.parentNode.removeChild(muro);

   let opcCorrect = sceneEl.querySelector("#" + opcion1 + "Opc");
   opcCorrect.parentNode.removeChild(opcCorrect);

   let opcBad = document.querySelector("#" + opcion2 + "Opc")
   opcBad.parentNode.removeChild(opcBad);
   contador += 10;
   console.log(contador)
   // document.querySelector("#puntuacion") = contador;
}

function mal(opcion1, opcion2, nMuro, sceneEl) {
   let muro = document.querySelector("#muro" + nMuro);
   muro.parentNode.removeChild(muro);

   // console.log('opcion1', opcion1)
   let opcCorrect = sceneEl.querySelector("#" + opcion1 + "Opc");
   opcCorrect.parentNode.removeChild(opcCorrect);

   let opcBad = document.querySelector("#" + opcion2 + "Opc")
   opcBad.parentNode.removeChild(opcBad);
}

function newOpci(trgOpc1, trgOpc2, position, rotation, src, depth, nMuro, rspTyp) {
   const nuevoBox = document.createElement('a-box');
   const sceneEl = document.querySelector('a-scene');

   nuevoBox.setAttribute('id', (rspTyp == 'bien' ? trgOpc1 : trgOpc2) + "Opc");
   nuevoBox.setAttribute('visible', 'true');
   nuevoBox.setAttribute('position', position);
   nuevoBox.setAttribute('rotation', rotation);
   nuevoBox.setAttribute('src', src);
   nuevoBox.setAttribute('depth', depth);
   nuevoBox.onclick = () => {
      rspTyp == 'bien' ? bien(trgOpc1, trgOpc2, nMuro, sceneEl) : mal(trgOpc1, trgOpc2, nMuro, sceneEl)
   };
   sceneEl.appendChild(nuevoBox);
}

function newWall(nMuro, position, rotation, depth, width, height) {
   const nuevoBox = document.createElement('a-box');
   const sceneEl = document.querySelector('a-scene');

   nuevoBox.setAttribute('id', "muro" + nMuro);
   nuevoBox.setAttribute('visible', 'false');
   nuevoBox.setAttribute('position', position);
   nuevoBox.setAttribute('rotation', rotation);
   nuevoBox.setAttribute('depth', (depth == null ? '0.1' : depth));
   nuevoBox.setAttribute('width', (width == null ? '6' : width))
   nuevoBox.setAttribute('height', (height == null ? '2' : height))
   nuevoBox.setAttribute('static-body', '')

   sceneEl.appendChild(nuevoBox);
}

function newfrase(pst, src, width, height, rt) {
   const nuevaFrase = document.createElement('a-plane');
   const sceneEl = document.querySelector('a-scene');

   nuevaFrase.setAttribute('id', 'frase')
   nuevaFrase.setAttribute('position', pst)
   nuevaFrase.setAttribute('src', src)
   nuevaFrase.setAttribute('material', "transparent:true")
   nuevaFrase.setAttribute('depth', '0.1')
   nuevaFrase.setAttribute('width', width)
   nuevaFrase.setAttribute('height', height)
   nuevaFrase.setAttribute('rotation', (rt == null ? '0 0 0' : rt));
   // console.log('rt', rt)

   sceneEl.appendChild(nuevaFrase);

   setTimeout(() => {
      sceneEl.removeChild(nuevaFrase)
   }, 5000);
}

function finalScore() {
   const puntuacion = document.querySelector('#score');
   const puntuacion1 = document.querySelector('#score1');
   // console.log(contador)

   puntuacion.setAttribute('visible', 'true');
   puntuacion1.setAttribute('visible', 'true');
   puntuacion1.setAttribute('text', 'value', contador);
   let audio = document.querySelector("#AC");
   audio.play();

   setTimeout(() => {
      puntuacion.setAttribute('visible', 'false');
      puntuacion1.setAttribute('visible', 'false');
      puntuation();

   }, 5000);
}



function puntuation() {
   const sceneEl = document.querySelector('a-scene');

   const nuevoBox = document.createElement('div');
   nuevoBox.setAttribute('style', "background-color: transparent; width: 100%; height: 100%; align-items: center; display: flex; justify-content: center;")

   const nuevoBox2 = document.createElement('div');
   nuevoBox2.setAttribute('id', "menuContainer")
   nuevoBox2.setAttribute('class', "menuContainer");
   nuevoBox2.setAttribute('style', "width: 100%; height: 100%; align-items: center; display: flex; justify-content: center; border-radius: 10%;z-index:1");

   const nuevoFrame = document.createElement('iframe')
   nuevoFrame.setAttribute('src',`./puntuacion.html?score=${contador}&newScore=${false}`)
   nuevoFrame.setAttribute('id', "iframe")
   nuevoFrame.setAttribute('width', "100%")
   nuevoFrame.setAttribute('height', "100%")
   nuevoFrame.setAttribute('scrolling', "no")
   nuevoFrame.setAttribute('frameborder', "0")
   nuevoFrame.setAttribute('marginheight', "0")
   nuevoFrame.setAttribute('marginwidth', "0")
   nuevoFrame.setAttribute('allow', "fullscreen; autoplay; encrypted-media; picture-in-picture; allow-forms; allow-scripts;")



   nuevoBox2.appendChild(nuevoFrame);
   nuevoBox.appendChild(nuevoBox2);
   sceneEl.appendChild(nuevoBox);

   // var event = document.createEvent('KeyboardEvent');
   // event.initKeyboardEvent('keydown', true, true, window, false, false, false, false, 20, 0);
   // document.dispatchEvent(event);
}  