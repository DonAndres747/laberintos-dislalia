//Movimiento
AFRAME.registerComponent('static-movement', {
   schema: { default: '' },
   init: function () {
      var el = this.el;
      el.addEventListener('click', function () {
         document.querySelector('#player').setAttribute('position', el.getAttribute('position'));
         console.log("Click: Player moved");
      });
   }
});

AFRAME.registerComponent('collider', {
   init: function () {
      this.el.addEventListener('collide', function (e) {

         const idTrigger = e.detail.body.el.id;
         const trg = e.detail.body.el; // o seleccione el elemento que tenga el ancho que desea obtener
         const trgAudio = trg.getAttribute('audio');
         const trgOpc1 = trg.getAttribute('opc1');
         const trgOpc2 = trg.getAttribute('opc2');
         const position = trg.getAttribute('post');
         const rotation = trg.getAttribute('rt');
         const src = trg.getAttribute('src1');
         const depth = trg.getAttribute('depth1');
         const nMuro = trg.getAttribute('nMuro');
         const respTyp = trg.getAttribute('respTyp');

         console.log("post1 " + position)

         const triggerArgs = {
            'trigger': [trgAudio],
            'triggerOpcAdd': [trgOpc1, trgOpc2, position, rotation, src, depth, nMuro, respTyp]
         };
         const triggers = {

            'trigger': (trgAudio) => {

               console.log(trgAudio)
               let audio = document.querySelector("#" + trgAudio);
               audio.play();
               e.detail.body.el.parentNode.removeChild(e.detail.body.el);
               
               // newOpci(trgOpc1, trgOpc2, position1, rotation, src1, depth, nMuro, 'bien');
               // newOpci(trgOpc1, trgOpc2, position2, rotation, src2, depth, nMuro, 'mal')

            },
            'triggerOpcAdd': (trgOpc1, trgOpc2, position, rotation, src, depth, nMuro, respTyp) => {

               newOpci(trgOpc1, trgOpc2, position, rotation, src, depth, nMuro, respTyp)
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
   console.log('opcCorrect', opcCorrect)
   opcCorrect.parentNode.removeChild(opcCorrect);

   let opcBad = document.querySelector("#" + opcion2 + "Opc")
   opcBad.parentNode.removeChild(opcBad);
}

function fraseWoody() {
   let frase = document.querySelector("#fw");
   frase.setAttribute("visible", "true");
   setTimeout(() => {
      frase.setAttribute("visible", "false");
   }, 5000);
}

function newOpci(trgOpc1, trgOpc2, position, rotation, src, depth, nMuro, respTyp) {
   const nuevoBox = document.createElement('a-box');
   const sceneEl = document.querySelector('a-scene');

   nuevoBox.setAttribute('id', (respTyp == 'bien' ? trgOpc1 : trgOpc2) + "Opc");
   nuevoBox.setAttribute('visible', 'true');
   nuevoBox.setAttribute('position', position);
   nuevoBox.setAttribute('rotation', rotation);
   nuevoBox.setAttribute('src', src);
   nuevoBox.setAttribute('depth', depth);
   nuevoBox.onclick = () => {
      respTyp == 'bien' ? bien(trgOpc1, trgOpc2, nMuro, sceneEl) : mal(trgOpc1, trgOpc2, nMuro, sceneEl)
   };
   console.log('id', nuevoBox.getAttribute('id'))
   console.log('respTyp', respTyp)
   sceneEl.appendChild(nuevoBox);
}
