import * as Tone from "tone"; 
console.log("lets make some sounds");

const synth = new Tone.Synth({ 
oscillator:{
        type:"triangle"   
    }
}).toDestination(); 

let pageBody = document.querySelector("body"); 

let musicBarBtn = document.createElement("button"); 
musicBarBtn.innerText = "Jalan's Star Wars "; 
pageBody.appendChild(musicBarBtn); 
musicBarBtn.addEventListener("click", playMusicBar); 
function playMusicBar(e) {
    const synth = new Tone.Synth().toDestination(); 
     const reverb = new Tone.Reverb({
    decay: 4,        // how long the reverb tail lasts (seconds)
    wet: 0.8,        // mix between dry (0) and wet (1)
  }).toDestination(); 
  synth.connect(reverb);

  
  const part = new Tone.Part((time, note) => {
    synth.triggerAttackRelease(note.note, note.duration, time);
  }, [
    // Bar 1
    ["0:0:0", { note: "G4", duration: "8n" }],
    ["0:1:0", { note: "G4", duration: "8n" }],
    ["0:2:0", { note: "G4", duration: "8n" }],
    ["0:2:3", { note: "Eb4", duration: "16n" }],
    ["0:3:0", { note: "Bb4", duration: "16n" }],
    ["0:3:1", { note: "G4", duration: "4n" }],

    // Bar 2
    ["1:0:0", { note: "Eb5", duration: "8n" }],
    ["1:1:0", { note: "Bb4", duration: "8n" }],
    ["1:2:0", { note: "G4", duration: "2n" }],

    // Bar 3
    ["2:0:0", { note: "Eb5", duration: "8n" }],
    ["2:1:0", { note: "Bb4", duration: "8n" }],
    ["2:2:0", { note: "G4", duration: "2n" }],

    // Bar 4
    ["3:0:0", { note: "Bb4", duration: "8n" }],
    ["3:1:0", { note: "Bb4", duration: "8n" }],
    ["3:2:0", { note: "Bb4", duration: "8n" }],
    ["3:2:3", { note: "Eb5", duration: "16n" }],
    ["3:3:0", { note: "Bb4", duration: "16n" }],
    ["3:3:1", { note: "G4", duration: "4n" }],
  ]);

  part.loop = true;   
  part.loopEnd = "4m"; 
  part.start(0);

  Tone.Transport.start();
}




 





   

 

