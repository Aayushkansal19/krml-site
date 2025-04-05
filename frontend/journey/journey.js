// Define the wheat-to-pack steps
// const steps = [
//     {
//       title: "🌱 Sowing",
//       image: "assets/sowing.svg",
//       description: "Our journey begins in the fertile fields where premium wheat seeds are carefully sown by expert farmers."
//     },
//     {
//       title: "🌿 Growing",
//       image: "assets/growing.svg",
//       description: "With time, care, and the blessings of nature, the wheat flourishes under the sun, nurtured organically."
//     },
//     {
//       title: "🌾 Harvesting",
//       image: "assets/harvesting.svg",
//       description: "At full maturity, golden wheat is harvested with precision, preserving every grain’s purity and potential."
//     },
//     {
//       title: "🏭 Milling",
//       image: "assets/milling.svg",
//       description: "The wheat enters our automated, hygienic chakki-based mills where it’s ground slowly for maximum nutrition."
//     },
//     {
//       title: "📦 Packaging",
//       image: "assets/packaging.svg",
//       description: "Zero-touch packaging seals in freshness, hygiene, and tradition — with complete traceability and care."
//     },
//     {
//       title: "🛒 Ready to Serve",
//       image: "assets/ready.svg",
//       description: "Now your KRML pack is ready — delivered from field to home, full of love, legacy, and life-sustaining nutrition."
//     }
//   ];
  
//   // Inject steps into HTML
//   const container = document.getElementById("journey-container");
  
//   steps.forEach(step => {
//     const section = document.createElement("section");
//     section.className = "journey-step";
  
//     section.innerHTML = `
//       <img src="${step.image}" alt="${step.title}">
//       <h2>${step.title}</h2>
//       <p>${step.description}</p>
//     `;
  
//     container.appendChild(section);
//   });
  
//   // Scroll animation logic
//   function revealOnScroll() {
//     const elements = document.querySelectorAll(".journey-step");
//     const windowHeight = window.innerHeight;
  
//     elements.forEach(el => {
//       const elementTop = el.getBoundingClientRect().top;
//       if (elementTop < windowHeight - 100) {
//         el.classList.add("visible");
//       }
//     });
//   }
  
//   window.addEventListener("scroll", revealOnScroll);
//   window.addEventListener("load", revealOnScroll);
  
//   const sound = new Audio("assets/flour-swish.mp3");
// let lastPlayedStep = -1;

// function revealOnScroll() {
//   const elements = document.querySelectorAll(".journey-step");
//   const windowHeight = window.innerHeight;

//   elements.forEach((el, i) => {
//     const elementTop = el.getBoundingClientRect().top;
//     if (elementTop < windowHeight - 100) {
//       el.classList.add("visible");

//       if (i !== lastPlayedStep) {
//         sound.currentTime = 0;
//         sound.play();
//         lastPlayedStep = i;
//       }
//     }
//   });
// }




// 1. Step content
const steps = [
    {
      title: "🌱 Sowing",
      image: "assets/sowing.svg",
      description: "Our journey begins in the fertile fields where premium wheat seeds are carefully sown by expert farmers."
    },
    {
      title: "🌿 Growing",
      image: "assets/growing.svg",
      description: "With time, care, and the blessings of nature, the wheat flourishes under the sun, nurtured organically."
    },
    {
      title: "🌾 Harvesting",
      image: "assets/harvesting.svg",
      description: "At full maturity, golden wheat is harvested with precision, preserving every grain’s purity and potential."
    },
    {
      title: "🏭 Milling",
      image: "assets/milling.svg",
      description: "The wheat enters our automated, hygienic chakki-based mills where it’s ground slowly for maximum nutrition."
    },
    {
      title: "📦 Packaging",
      image: "assets/packaging.svg",
      description: "Zero-touch packaging seals in freshness, hygiene, and tradition — with complete traceability and care."
    },
    {
      title: "🛒 Ready to Serve",
      image: "assets/ready.svg",
      description: "Now your KRML pack is ready — delivered from field to home, full of love, legacy, and life-sustaining nutrition."
    }
  ];
  
  // 2. Inject sections
  const container = document.getElementById("journey-container");
  
  steps.forEach(step => {
    const section = document.createElement("section");
    section.className = "journey-step";
    section.innerHTML = `
      <img src="${step.image}" alt="${step.title}">
      <h2>${step.title}</h2>
      <p>${step.description}</p>
    `;
    container.appendChild(section);
  });
  
  // 3. Reveal animation + sound logic
  const sound = new Audio("assets/flour-swish.mp3");
  let lastPlayedStep = -1;
  
  function revealOnScroll() {
    const elements = document.querySelectorAll(".journey-step");
    const windowHeight = window.innerHeight;
  
    elements.forEach((el, i) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add("visible");
  
      }
    });
  }
  
  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);



  // Load continuous sound
const ambient = new Audio("assets/flour-swish.mp3");
ambient.loop = true;
ambient.volume = 0.4;

// Start playing after first user interaction
document.addEventListener("click", () => {
  if (ambient.paused) {
    ambient.play().catch(err => {
      console.log("Autoplay blocked until interaction");
    });
  }
}, { once: true });

  const muteBtn = document.getElementById("muteBtn");

muteBtn.addEventListener("click", () => {
  if (ambient.muted) {
    ambient.muted = false;
    muteBtn.textContent = "🔈";
  } else {
    ambient.muted = true;
    muteBtn.textContent = "🔇";
  }
});
