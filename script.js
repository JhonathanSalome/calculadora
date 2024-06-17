// The proCalculator constructor takes in three arguments.
// The first arguments will be the parents of the calculator buttons.
// The second arguments will be the answer display.
// The third arguments will be the solute to be calculated.

// The equalState variable checks if a calculation has been done
// this allow for chaining of calculation functions in the calculator.

class ProCalculator { /* class(classe são um modelo para criar objetos) ProCalculator(name te class) */
    constructor(master, screen, display) { /* constructor(construtor é um método especial para criar e inicializar um objeto criado a partir de uma classe) master, screen, display(atributos) */
        this.master = master; /* this(refere-se ao objeto global) master igual master */
        this.screen = screen;
        this.display = display;
    }
    init(){ /* init */
        let equalState = false; /* let(declara variáveis locais reatribuíveis e com escopo de bloco) equalState(verifica se um cálculo foi feito) igual false(falso) */
        this.master.addEventListener('click', (e) => { /* this(refere-se ao objeto global) master igual master, master(), addEventListener(registra uma única espera de evento em um único alvo) click e */
            let button = e.target; /* let(declara variáveis locais reatribuíveis e com escopo de bloco), button(botão) igual e.(ponto) target(propriedade de destino somente leitura da interface) */
            if (button.id === "number"){ /* if(se) button(botão).(ponto)id(identificador) igual number(número) */
                if (equalState) { /* if(se) equalState(verifica se um cálculo foi feito) */
                    equalState = false; /* equalState(verifica se um cálculo foi feito) igual false(falso) */
                    this.display.innerHTML = ""; /* this(refere-se ao objeto global) display(), innerHTML(obtém ou define a marcação HTML ou XML contida no elemento) */
                    this.display.innerHTML += button.innerHTML ; /* this(refere-se ao objeto global) display(), innerHTML(obtém ou define a marcação HTML ou XML contida no elemento) +=(mais igual) button(botão).(ponto)innerHTML(obtém ou define a marcação HTML ou XML contida no elemento) */
                }else{ /* else(senão) */
                    this.display.innerHTML += button.innerHTML;
                }
            }else if (button.id === "clear") { /* else(senão) if(se) button(botão).(ponto)id ===(igual) clear(limpar) */
                this.display.innerHTML = ''; /* this(refere-se ao objeto global).display. innerHTML(obtém ou define a marcação HTML ou XML contida no elemento) */
                this.screen.innerHTML = '0'; /* this(refere-se ao objeto global).screen(tela). innerHTML(obtém ou define a marcação HTML ou XML contida no elemento) */
            }else if(button.id === 'delete'){ /* else(senão) if(se) button(botão).(ponto)id ===(igual) delete(deletado) */
                let scr = this.display.innerHTML; /* let(declara variáveis locais reatribuíveis e com escopo de bloco), scr(name da variável), this(refere-se ao objeto global).display. innerHTML(obtém ou define a marcação HTML ou XML contida no elemento) */
                this.display.innerHTML = scr.slice(0, scr.length-1); /* this(refere-se ao objeto global).display. innerHTML(obtém ou define a marcação HTML ou XML contida no elemento) =(igual) scr(name variável).slice(permite “fatiar” uma string ou array e recuperar parte dos seus elementos) */
            }else if (button.id === "opKey") { /* else(senão) if(se) button(botão).id ==(igual) opKey() */
                this.noDup(button, () => { /* this(refere-se ao objeto global).noDup() button(botão) () => */
                    if (equalState) {
                        equalState = false;
                        this.display.innerHTML = this.screen.innerHTML;
                        this.screen.innerHTML = '';
                        this.display.innerHTML += button.innerHTML;
                    }else{
                        this.display.innerHTML += button.innerHTML;
                    }
                });
            }else if (button.id === 'equal'){
                let answer = eval(this.display.innerHTML);
                let scr = this.display.innerHTML;
                this.noDup(answer, equalState, () => {
                    this.screen.innerHTML = answer;
                    equalState = true; 
                });
            }
        });
    }
    noDup(){ /* noDup */
        let callBack = arguments[arguments.length-1]; /* let(declara variáveis locais reatribuíveis e com escopo de bloco) callBanck(name variável) =(igual) arguments(objeto semelhante a matriz dentro de funções que contém os valores dos argumentos passados para essa função), length(propriedade de dados de um String, o valor contém o comprimento da string) menos 1 */
        let scr = this.display.innerHTML; /* let(declara variáveis locais reatribuíveis e com escopo de bloco) scr(name variável) =(igual) this(refere-se ao objeto global).display. innerHTML(obtém ou define a marcação HTML ou XML contida no elemento) */
        let c = scr.charAt(scr.length-1); /* let(declara variáveis locais reatribuíveis e com escopo de bloco) c(name variável) =(igual) scr(name the variável).charAt(método, retorna o caractere especificado a partir de uma string), scr(variável).length(propriedade de dados de um String, o valor contém o comprimento da string) menos 1 */
        if (c === '+' || c === '-' || c === '*' || c === '/') { /* if(se) c(variável) ===(igual) '+(string)' ||(ou) c(variável) ===(igual) '-(string)' ||(ou) c(variável) ===(igual) '*(string)' ||(ou) c(variável) ===(igual) '/(string)' */
            scr += '' ; /* scr(variável) +=(mais and igual) */
        }else { /* else(senão) */
            callBack(arguments[0]); /* callBanck(variável), arguments(objeto semelhante a matriz dentro de funções que contém os valores dos argumentos passados para essa função) */
        }
    }
}

const calcButtons = document.querySelectorAll('.calculator-buttons')[0]; /* document.querySelectorAll(retorna uma lista de elementos presentes no documento(usando ordenação em profundidade, pré-ordenada e transversal dos nós do documento) que coincidam com o grupo de seletores especificado */
const screen = document.querySelector('#screen-bottom');
const display = document.querySelector('#screen-top'); /* const(cria uma variável cujo o valor é fixo, ou seja, uma constante somente leitura a um valor, referência somente leitura a um valor) display(name), document.querySelector(retorna o primeiro elemento dentro do documento(usando ordenação em profundidade, pré-ordenada e transversal dos nós do documento) que corresponde ao grupo especificado de seletores */
 calc = new ProCalculator(calcButtons, screen, display); /* const(cria uma variável cujo o valor é fixo, ou seja, uma constante somente leitura a um valor, referência somente leitura a um valor) calc(name) =(igual) new(novo, cria uma instancia de um tipo de objeto) ProCalculator(name constructor) calcButtons, screen, display(parâmetros the calc) */

calc.init();