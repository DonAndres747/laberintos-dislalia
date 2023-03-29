// AFRAME.registerComponent('wasd-movement', {
//    init: function () {
//      this.el.addEventListener('componentchanged', function (evt) {
//        if (evt.detail.name === 'position') {
//          console.log("Position: ", this.getAttribute('position'));
//        }
//      });
//    }
//  });

 
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
         
         rt = (rt2==null?rt:rt2)

            
         const triggerArgs = {
            'trigger': [trgAudio, trgOpc1, trgOpc2, post1, post2, postW, rt, rotationW, src1, src2, depth, depthW, nMuro, rspTyp1, rspTyp2, widthW, heightW]
         };
         const triggers = {

            'trigger': (trgAudio, trgOpc1, trgOpc2, post1, post2, postW, rt, rotationW, src1, src2, depth, depthW, nMuro, rspTyp1, rspTyp2, widthW, heightW) => {

               newOpci(trgOpc1, trgOpc2, post1, rt, src1, depth, nMuro, rspTyp1)
               newOpci(trgOpc1, trgOpc2, post2, rt, src2, depth, nMuro, rspTyp2)
               newWall(nMuro, postW, (rotationW==null?rt:rotationW), depthW, widthW, heightW);
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

   console.log('opcion1', opcion1)
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

function newWall(nMuro, position, rotation, depth, width, height){
   const nuevoBox = document.createElement('a-box');
   const sceneEl = document.querySelector('a-scene');

   nuevoBox.setAttribute('id', "muro" + nMuro);
   nuevoBox.setAttribute('visible', 'false');
   nuevoBox.setAttribute('position', position);
   nuevoBox.setAttribute('rotation', rotation);
   nuevoBox.setAttribute('depth', (depth==null?'0.1':depth));
   nuevoBox.setAttribute('width', (width==null?'6':width))
   nuevoBox.setAttribute('height', (height==null?'2':height))
   // nuevoBox.setAttribute('static-body', '')
   
   sceneEl.appendChild(nuevoBox);
}

function newfrase(pst, src, width, height, rt) {
   // let frase = document.querySelector("#fw");
   // frase.setAttribute("visible", "true");
   // setTimeout(() => {
   //    frase.setAttribute("visible", "false");
   // }, 5000);

   const nuevaFrase = document.createElement('a-plane');
   const sceneEl = document.querySelector('a-scene');

   nuevaFrase.setAttribute('id','frase')
   nuevaFrase.setAttribute('position',pst)
   nuevaFrase.setAttribute('src',src)
   nuevaFrase.setAttribute('material',"transparent:true")
   nuevaFrase.setAttribute('depth','0.1')
   nuevaFrase.setAttribute('width',width)
   nuevaFrase.setAttribute('height',height)
   nuevaFrase.setAttribute('rotation', (rt==null?'0 0 0':rt));
   console.log('rt', rt)
   
   sceneEl.appendChild(nuevaFrase);

   setTimeout(() => {
      sceneEl.removeChild(nuevaFrase)
   }, 5000);
}