import React from 'react';
import { FaUserMd, FaDog, FaShoppingCart, FaChurch } from 'react-icons/fa';


interface Benefit {
  title: string;
  icon?: React.ReactNode;
  description: string;
}

const benefits: Benefit[] = [
  { title: 'Telemedicina', description: 'Acesso instantâneo a profissionais de saúde qualificados, sem sair de casa. Consultas médicas online disponíveis 24h, 7 dias na semana para atender suas necessidades de saúde de forma rápida e conveniente.', icon: <FaUserMd /> },
  { title: 'Clube de Descontos', description:'Economize em suas compras diárias e desfrute de descontos exclusivos em uma ampla rede de parceiros como: farmácias, supermercados, restaurantes, entre outro' , icon: <FaShoppingCart/> },
  { title: 'Assistência funeral', description:'Em momentos difíceis, estamos ao seu lado para oferecer suporte emocional e logístico. Nosso plano de assistência funeral ajuda a aliviar o fardo financeiro e organizacional durante esses momentos sensíveis.', icon: <FaChurch/> },
];

const Benefits =  () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container px-5 md:px-10 mx-auto flex justify-center">
        <div className="max-w-4xl text-center md:text-left">
          <h2 className="text-3xl font-bold mb-8 text-custom-blue">Os melhores benefícios para você</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="w-full md:text-left flex flex-col items-center justify-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center bg-custom-blue text-3xl rounded-full text-white">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-custom-blue">{benefit.title}</h3>
                <p className="text-xl font-light text-custom-blue">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

  );
};

export default Benefits;
