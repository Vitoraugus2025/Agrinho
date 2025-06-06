// Jogo Agrinho 2025 - Versão completa com cenário, menino feliz, passarinhos, carros, fumaça e cidade

let menino;
let arvores = [];
let sementes = 30; // Mais sementes para plantar bastante
let arvoresPlantadas = 0;
let solo;
let passaros = [];
let carros = [];
let fumaças = [];
let nuvens = [];

function setup() {
  createCanvas(800, 400);
  solo = height - 50;
  menino = createVector(100, solo);
  
  // Inicializa pássaros
  for (let i = 0; i < 6; i++) {
    passaros.push({
      x: random(width),
      y: random(50, 150),
      speed: random(1, 2),
      wing: 0,
      flapUp: true
    });
  }
  
  // Inicializa carros
  for (let i = 0; i < 4; i++) {
    carros.push({
      x: random(width),
      y: solo + 20,
      speed: random(1, 3),
      cor: color(random(50, 255), random(50, 255), random(50, 255))
    });
  }
  
  // Inicializa fumaça
  for (let i = 0; i < 6; i++) {
    fumaças.push({
      x: i * 60 + 50,
      y: solo - 130,
      offset: random(20),
      alpha: 150
    });
  }
  
  // Inicializa nuvens
  for (let i = 0; i < 5; i++) {
    nuvens.push({
      x: random(width),
      y: random(30, 80),
      speed: random(0.3, 0.7)
    });
  }
}

function draw() {
  // Céu e solo
  background('#87CEEB'); // azul claro céu
  fill('#5C4033');
  rect(0, solo, width, 50); // chão
  
  // Sol
  fill('#FFD700');
  ellipse(700, 80, 80, 80);
  
  // Nuvens
  fill(255, 255, 255, 200);
  noStroke();
  for (let n of nuvens) {
    ellipse(n.x, n.y, 60, 40);
    ellipse(n.x + 30, n.y + 10, 50, 30);
    ellipse(n.x - 30, n.y + 10, 50, 30);
    
    n.x += n.speed;
    if (n.x > width + 50) n.x = -50;
  }
  
  // Cidade ao fundo com prédios e janelas
  for (let i = 0; i < width; i += 70) {
    fill('#8B8B8B');
    rect(i, solo - 150, 60, 150);
    // Janelas
    fill('#FFFF66');
    for (let y = solo - 140; y < solo - 10; y += 30) {
      for (let x = i + 5; x < i + 60; x += 20) {
        rect(x, y, 10, 20);
      }
    }
  }
  
  // Fumaça saindo da cidade
  for (let f of fumaças) {
    fill(150, f.alpha);
    ellipse(f.x, f.y + f.offset, 25, 25);
    ellipse(f.x + 15, f.y + f.offset - 15, 20, 20);
    ellipse(f.x - 15, f.y + f.offset - 10, 15, 15);
    
    f.offset -= 0.5;
    f.alpha -= 1;
    
    if (f.offset < -60 || f.alpha <= 0) {
      f.offset = random(20);
      f.alpha = 150;
    }
  }
  
  // Estrada para carros
  fill('#555555');
  rect(0, solo + 15, width, 35);
  fill(255, 255, 0);
  for (let i = 0; i < width; i += 40) {
    rect(i, solo + 30, 20, 5);
  }
  
  // Carros passando
  for (let c of carros) {
    fill(c.cor);
    rect(c.x, c.y, 60, 30, 5);
    fill(0);
    ellipse(c.x + 15, c.y + 30, 15, 15);
    ellipse(c.x + 45, c.y + 30, 15, 15);
    
    c.x += c.speed;
    if (c.x > width + 60) {
      c.x = -60;
      c.y = solo + 20;
    }
  }
  
  // Árvores plantadas
  for (let a of arvores) {
    // tronco
    fill('#8B4513');
    rect(a.x + 10, solo - 50, 15, 50);
    // copa
    fill('#228B22');
    ellipse(a.x + 17, solo - 70, 60, 60);
  }
  
  // Menino com rosto feliz e detalhes
  drawMenino(menino.x, menino.y);
  
  // Passarinhos voando bonitinhos
  for (let p of passaros) {
    drawPassaro(p.x, p.y, p.wing);
    p.x += p.speed;
    if (p.x > width + 30) {
      p.x = -30;
      p.y = random(50, 150);
    }
    if (p.flapUp) {
      p.wing += 0.15;
      if (p.wing > PI / 6) p.flapUp = false;
    } else {
      p.wing -= 0.15;
      if (p.wing < -PI / 6) p.flapUp = true;
    }
  }
  
  // HUD - Informações do jogo
  fill(0);
  textSize(18);
  textAlign(LEFT);
  text("Sementes: " + sementes, 20, 30);
  text("Árvores plantadas: " + arvoresPlantadas, 20, 55);
  text("Use ← e → para mover, espaço para plantar", 20, 80);
  
  // Mensagem de vitória
  if (sementes === 0) {
    textSize(28);
    fill('#006400');
    textAlign(CENTER);
    text("Você usou todas as sementes! 🌳 Parabéns!", width / 2, height / 2);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    menino.x = max(0, menino.x - 20);
  } else if (keyCode === RIGHT_ARROW) {
    menino.x = min(width, menino.x + 20);
  } else if (key === ' ' && sementes > 0) {
    arvores.push({ x: menino.x });
    sementes--;
    arvoresPlantadas++;
  }
}

// Função para desenhar o menino feliz
function drawMenino(x, y) {
  push();
  translate(x, y);
  
  // Corpo
  fill('#FFD700');
  rect(-15, -60, 30, 60, 5);
  
  // Cabeça
  fill('#FFDBAC');
  ellipse(0, -80, 40, 40);
  
  // Olhos
  fill(0);
  ellipse(-10, -85, 6, 6);
  ellipse(10, -85, 6, 6);
  
  // Boca feliz
  noFill();
  stroke(0);
  strokeWeight(3);
  arc(0, -70, 20, 15, 0, PI);
  noStroke();
  
  // Cabelo estilizado
  fill(50, 30, 10);
  triangle(-15, -95, -5, -110, -3, -90);
  triangle(5, -100, 15, -110, 10, -90);
  
  pop();
}

// Função para desenhar passarinhos mais bonitos com asas batendo
function drawPassaro(x, y, wingAngle) {
  push();
  translate(x, y);
  
  // Corpo amarelo
  fill('#FFD700');
  noStroke();
  ellipse(0, 0, 30, 20);
  
  // Cabeça laranja claro
  fill('#FFB347');
  ellipse(12, -5, 15, 15);
  
  // Olho preto
  fill(0);
  ellipse(15, -7, 4, 4);
  
  // Bico laranja escuro
  fill('#FF8C00');
  triangle(22, -5, 27, -2, 22, -1);
  
  // Asa direita (batendo)
  fill('#FFA500');
  push();
  rotate(wingAngle);
  ellipse(-5, 0, 20, 10);
  pop();
  
  // Asa esquerda (batendo)
  push();
  rotate(-wingAngle);
  ellipse(-5, 0, 20, 10);
  pop();
  
  pop();
}
