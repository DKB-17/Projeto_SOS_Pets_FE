import { Heart, AlertCircle, Home, Users } from 'lucide-react'
import ImageCarousel from './image-carousel'

export function OngStory() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <p className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Nossa Trajetória</p>
          </div>

          {/* Story Timeline */}
          <div className="space-y-12">
            {/* Story Block 1 */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 items-center">
              <div className="order-1 md:order-2 space-y-4 ">
                <div className="flex items-center gap-3 justify-center">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold">
                    01
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">SOS PETS ASSIS</h3>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed">
                  A SOS Pets é uma organização não governamental, criada em 2014, reconhecida pela Lei 6.240/2016 como de utilidade pública do Município de Assis, que tem como objetivo promover adoção e castração de animais de rua. Administrada sob o ideal de fazer a diferença na vida dos animais abandonados, do pensamento de que a base de tudo é a castração dos animais e a conscientização das pessoas e a causa, a mais bela de todas, que é a de salvar uma vida. Uma única que seja já é motivo de glória para nós. Privá-la da dor, do sofrimento e do medo e cobri-la de alegria, tranquilidade e amor.
                  Nossa sede administrativa fica em Assis/SP, mas não temos abrigo para animais. Trabalhamos com o conceito de lares temporários, ou seja, pessoas que cedem um espaço de suas casas e de seu tempo para nos ajudar a acolher e doar os animais que resgatamos. 
                  Somos um grupo de amigos engajados em torno destes ideais.
                </p>
              </div>
            </div>
          </div>

          {/* Impact Highlights */}
          <div className="mt-16 pt-16 pb-15 border-t border-b border-slate-200">
            <p className="text-center text-teal-600 font-semibold text-sm uppercase tracking-wider mb-8">
              Números que Contam uma História
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-teal-600 mb-2">500+</div>
                <p className="text-slate-600 font-medium">Vidas Resgatadas</p>
                <p className="text-sm text-slate-500 mt-2">Animais que receberam uma segunda chance</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">150+</div>
                <p className="text-slate-600 font-medium">Voluntários Dedicados</p>
                <p className="text-sm text-slate-500 mt-2">Pessoas que fazem a diferença todo dia</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-teal-500 mb-2">100%</div>
                <p className="text-slate-600 font-medium">Amor e Dedicação</p>
                <p className="text-sm text-slate-500 mt-2">Em cada ação que tomamos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
