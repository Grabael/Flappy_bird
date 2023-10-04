const sprites = new Image()
sprites.src = './sprites.png'
const joinha = new Image()
joinha.src = './tomakk.png'
const hit = new Audio()
hit.src = './sound_effects/efeitos_hit.wav'
const pulo = new Audio()
pulo.src = './sound_effects/efeitos_pulo.wav'
const caiu = new Audio()
caiu.src = './sound_effects/efeitos_caiu.wav'
const ponto = new Audio()
ponto.src = './sound_effects/efeitos_ponto.wav'

let frames = 0
const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

let BocaNoCano = false
// tela inicial
const inicio = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    
    desenha(){
        contexto.drawImage(
            sprites,
            inicio.spriteX, inicio.spriteY,
            inicio.largura, inicio.altura,
            inicio.x, inicio.y,
            inicio.largura, inicio.altura,
        )
    }
}
const score = {
            desenha(){        
            contexto.font = '35px "VT323"'
            contexto.textAlign = 'right'
            contexto.fillStyle = 'white'
            contexto.fillText(`${placar.pontuacao} `, canvas.width - 10, 35)
            placar.pontuacao
    }
}

const mengasemGameOver = {
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    
    desenha(){
        contexto.drawImage(
            sprites,
            mengasemGameOver.spriteX, mengasemGameOver.spriteY,
            mengasemGameOver.largura, mengasemGameOver.altura,
            mengasemGameOver.x, mengasemGameOver.y,
            mengasemGameOver.largura, mengasemGameOver.altura,
        )
    }
}
//canos
function criaCano(){
    const cano = {
    
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 88,
        desenha(){
            cano.pares.forEach(function(par){
                //ceu
                const yRandom = par.y
                const espacoEntreOsCanos = 110
    
                const canoCeuX = par.x
                const canoCeuY = yRandom
                
                contexto.drawImage(
                    sprites,
                    cano.ceu.spriteX, cano.ceu.spriteY,
                    cano.largura, cano.altura,
                    canoCeuX, canoCeuY,
                    cano.largura, cano.altura,
                )
                //chao
                const canoChaoX = par.x
                const canoChaoY = cano.altura + espacoEntreOsCanos + yRandom
    
                contexto.drawImage(
                    sprites,
                    cano.chao.spriteX, cano.chao.spriteY,
                    cano.largura, cano.altura,
                    canoChaoX, canoChaoY,
                    cano.largura, cano.altura,
                )
                par.canoCeu = {
                    y: cano.altura + canoCeuY,
                    x: canoCeuX
                }
                par.canoChao = {
                    y: canoChaoY,
                    x: canoChaoX
                }
            })
        },
        temColisaoComOFlappyBird(par){

                const cabecaDoFlappy = globais.FlapyBird.y
                const peDoFlappy = globais.FlapyBird.y + globais.FlapyBird.altura
                if(globais.FlapyBird.largura >= par.x){
                    ponto.play()    
                    if(cabecaDoFlappy <= par.canoCeu.y){
                        hit.play()
                        estaMorto = true
                        BocaNoCano = true
                        return true
                    }
                    
                    if(peDoFlappy >= par.canoChao.y){
                        hit.play()
                        estaMorto = true
                        BocaNoCano = true
                        return true
                    }
                }

              //  return true

                return false

            },
        pares: [],
        atualiza(){
            const passou100frames = frames % 100 === 0 
            if(passou100frames){
                cano.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                })
            }
            cano.pares.forEach(function(par){
                par.x = par.x - 2

                if(cano.temColisaoComOFlappyBird(par)){
                    
                    mudaTela(tela.game_over)
                }

                if(par.x + cano.largura <= 0){
                    cano.pares.shift()
                }
            })
        }
    }
    return cano
}

// plano de fundo
function CriaFundo(){

    const fundo = {
        
        spriteX: 390,
        spriteY: 0,
        largura: 275,
        altura: 204,
        x: 0,
        y: canvas.height - 204,
        
        
        desenha(){
            contexto.fillStyle = '#70c5ce'
            contexto.fillRect(0,0, canvas.width, canvas.height)
            
            contexto.drawImage(
                sprites,
                fundo.spriteX, fundo.spriteY,
                fundo.largura, fundo.altura,
                fundo.x, fundo.y,
                fundo.largura, fundo.altura,
                )
                contexto.drawImage(
                    sprites,
                    fundo.spriteX, fundo.spriteY,
                    fundo.largura, fundo.altura,
                    fundo.x + fundo.largura, fundo.y,
                    fundo.largura, fundo.altura,
                    )
                }   
            }
            return fundo
        } 
            //chao
            function CriaChao(){
                const chao = {
                    
                    spriteX: 0,
                    spriteY: 610,
                    largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza(){ 
            const MovimentoDoChao = 1
            const repeteEm = chao.largura / 2
            const movimentacao = chao.x - MovimentoDoChao
            chao.x = movimentacao % repeteEm
        },
    
        desenha(){
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            )
    
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x + chao.largura, chao.y,
                chao.largura, chao.altura,
            )
        },
}
    return chao
}
 //colisão
function fazColisao(){
    const FlapyBirdY = globais.FlapyBird.y + globais.FlapyBird.altura
    const chaoY = globais.chao.y

    if(FlapyBirdY >= chaoY){
        return true
    }
    return false
}
// criar o passaralho
let estaMorto = false
function criaFlappybird(){
    const FlapyBird = {
    
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 5,
        pula(){
            pulo.play()
            FlapyBird.velocidade = -FlapyBird.pulo
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza(){
            if(fazColisao(FlapyBird, globais.chao)){
                mudaTela(tela.game_over)
                hit.play()
                estaMorto = true
                return
            }
    
            FlapyBird.velocidade = FlapyBird.velocidade + FlapyBird.gravidade
            FlapyBird.y = FlapyBird.y + FlapyBird.velocidade
        },
        movimentos: [
            {spriteX: 0, spriteY: 0, },
            {spriteX: 0, spriteY: 26, },
            {spriteX: 0, spriteY: 52, },
            {spriteX: 0, spriteY: 26, }
        ],
        framesAtual: 0,
        atualizaOFrameAtual(){
            const intervaloDeFrames = 10
            const passouOIntervalo = frames % intervaloDeFrames === 0
            if(passouOIntervalo){
                const baseDoIncremento = 1
                const incremento = baseDoIncremento +FlapyBird.framesAtual
                const baseRepeticao = FlapyBird.movimentos.length
                FlapyBird.framesAtual = incremento % baseRepeticao
            }
        },
        desenha(){
            FlapyBird.atualizaOFrameAtual()
            const { spriteX, spriteY } = FlapyBird.movimentos[FlapyBird.framesAtual]
            contexto.drawImage(
                sprites,
                spriteX, spriteY, // sprite x , sprite y
                FlapyBird.largura, FlapyBird.altura, // tamanho do recorte na sprite
                FlapyBird.x, FlapyBird.y,
                FlapyBird.largura, FlapyBird.altura
                )
            }
    }
    return FlapyBird
}
let best = 0
function criaPlacar(){
    let placar = {
        pontuacao: 0,
        desenha(){           
            if(!estaMorto){
                contexto.font = '35px "VT323"'
                contexto.textAlign = 'right'
                contexto.fillStyle = 'white'
                contexto.fillText(`${placar.pontuacao} `, canvas.width - 10, 35)
                placar.pontuacao
            }       
            if(estaMorto){
            contexto.font = '28px "VT323"'
            contexto.fillText(`${placar.pontuacao} `, canvas.width - 70, 145)
            }       
            if(estaMorto){
            contexto.font = '28px "VT323"'
            contexto.fillText(`${best} `, canvas.width - 70, 190)
            }
            if(estaMorto){
            if (placar.pontuacao <= 5) {
                MedalhaFerro.desenha()
            } 
            if(placar.pontuacao <= 10 && placar.pontuacao > 5) {
                MedalhaBronze.desenha()
            }
            if(placar.pontuacao <= 20 && placar.pontuacao > 10){
                MedalhaPrata.desenha()
            }
            if(placar.pontuacao > 20){
                MedalhaOuro.desenha()
            }
        }           
    },
        atualiza(){
            const intervaloDeFrames = 20
            const passouOIntervalo = frames % intervaloDeFrames === 0
            if(passouOIntervalo){
                placar.pontuacao = placar.pontuacao + 1
            }
            let pontoatual  = placar.pontuacao
            if(pontoatual > best){
                best = pontoatual
            } 
        }

    }
    return placar
}
const MedalhaFerro = {
    spriteX: 44,
    spriteY: 44,
    largura: 77,
    altura: 77,
    x: 69,
    y: 102,
    desenha(){
        contexto.drawImage(
            sprites,
            MedalhaFerro.spriteX, MedalhaFerro.spriteY,
            MedalhaFerro.largura, MedalhaFerro.altura,
            MedalhaFerro.x, MedalhaFerro.y,
            MedalhaFerro.largura, MedalhaFerro.altura,
        )
    }
}
const MedalhaBronze = {
    spriteX: 44,
    spriteY: 123,
    largura: 77,
    altura: 46,
    x: 69,
    y: 134,
    desenha(){
        contexto.drawImage(
            sprites,
            MedalhaBronze.spriteX, MedalhaBronze.spriteY,
            MedalhaBronze.largura, MedalhaBronze.altura,
            MedalhaBronze.x, MedalhaBronze.y,
            MedalhaBronze.largura, MedalhaBronze.altura,
        )
    }
}
const MedalhaPrata = {
    spriteX: 0,
    spriteY: 77,
    largura: 47,
    altura: 47,
    x: 73,
    y: 136,
    desenha(){
        contexto.drawImage(
            sprites,
            MedalhaPrata.spriteX, MedalhaPrata.spriteY,
            MedalhaPrata.largura, MedalhaPrata.altura,
            MedalhaPrata.x, MedalhaPrata.y,
            MedalhaPrata.largura, MedalhaPrata.altura,
        )
    }
}
const MedalhaOuro = {
    spriteX: 0,
    spriteY: 122,
    largura: 47,
    altura: 47,
    x: 73,
    y: 136,
    desenha(){
        contexto.drawImage(
            sprites,
            MedalhaOuro.spriteX, MedalhaOuro.spriteY,
            MedalhaOuro.largura, MedalhaOuro.altura,
            MedalhaOuro.x, MedalhaOuro.y,
            MedalhaOuro.largura, MedalhaOuro.altura,
        )
    }
}
//tela
const globais = {}
let telaAtiva = {}
function mudaTela(novaTela){
    telaAtiva = novaTela
    if(telaAtiva.inicializa){
        telaAtiva.inicializa()
    }
}
    const tapaBuraco = {
        spriteX: 0,
        spriteY: 0,
    largura: 320,
    altura: 40,
    x: 0,
    y: 0,
    desenha(){
        contexto.drawImage(
            joinha,
            tapaBuraco.spriteX, tapaBuraco.spriteY,
            tapaBuraco.largura, tapaBuraco.altura,
            tapaBuraco.x, tapaBuraco.y,
            tapaBuraco.largura, tapaBuraco.altura,
        )
        if(BocaNoCano){
            
            contexto.font = '30px "VT323"',
            contexto.textAlign = 'center',
            contexto.fillStyle = 'white',
            contexto.fillText(`foi de boca no cano kkkj`, canvas.width - 160, 30)
            }else{
 
                contexto.font = '30px "VT323"',
                contexto.textAlign = 'center',
                contexto.fillStyle = 'white',
                contexto.fillText(`esqueceu de voar kkkj`, canvas.width - 160, 30)
            }
        }
}

const tela = {
    inicial: {
        inicializa(){
            globais.FlapyBird = criaFlappybird()
            globais.chao = CriaChao()
            globais.cano = criaCano()
            globais.fundo = CriaFundo()
        },
        desenha(){
            globais.fundo.desenha()
            globais.cano.desenha()
            globais.chao.desenha()
            globais.FlapyBird.desenha()
            inicio.desenha()
        },
        click(){
            mudaTela(tela.jogo)
        },

        atualiza(){
            globais.chao.atualiza()
        }
    }
}

tela.jogo = {
    inicializa(){
        globais.placar = criaPlacar()
    },
    desenha(){
        globais.fundo.desenha()
        globais.cano.desenha()
        globais.chao.desenha()
        globais.FlapyBird.desenha()
        globais.placar.desenha()
    },

    click(){
        globais.FlapyBird.pula()
    },

    atualiza(){
        globais.cano.atualiza()
        globais.FlapyBird.atualiza()
        globais.chao.atualiza()
        globais.placar.atualiza()
    }
}

tela.game_over = {
    desenha(){
        tapaBuraco.desenha()
        mengasemGameOver.desenha()
        globais.placar.desenha()
    },
    atualiza(){

    },
    click(){
        BocaNoCano = false
        estaMorto = false
        mudaTela(tela.inicial)
    }
}

function loop (){
    telaAtiva.desenha()
    telaAtiva.atualiza()

    frames = frames + 1
    requestAnimationFrame(loop)
}
let mobile = false
if(navigator.userAgent.indexOf("Android") != -1 || navigator.userAgent.indexOf("like Mac") != -1) mobile = true
console.log(mobile)
if(mobile){
    window.addEventListener('touchstart', function() {
        if (telaAtiva.click)
        telaAtiva.click()
    })
    } else{
            window.addEventListener('keypress', function() {
                if (telaAtiva.click)
                telaAtiva.click()
            })
        }
mudaTela(tela.inicial)
loop()






// 44px x e y
// 77px altura