import { useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { StopCircleIcon as CircleIcon } from '@heroicons/react/24/solid';

export default function AddressSearch() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="absolute top-0 left-0 right-0 bg-white shadow-lg rounded-b-2xl p-4 transition-all">
      <div className={`${isExpanded ? 'h-64' : 'h-auto'}`}>
        {/* Barra de Pesquisa Colapsada */}
        {!isExpanded && (
          <div 
            onClick={() => setIsExpanded(true)}
            className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg"
          >
            <MapPinIcon className="w-5 h-5 text-primary" />
            <span className="text-gray-500">Para onde você quer ir?</span>
          </div>
        )}

        {/* Formulário Expandido */}
        {isExpanded && (
          <div className="space-y-4">
            {/* Botão Voltar */}
            <button 
              onClick={() => setIsExpanded(false)}
              className="text-gray-500"
            >
              ← Voltar
            </button>

            {/* Campo Origem */}
            <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg">
              <CircleIcon className="w-3 h-3 text-primary" />
              <input
                type="text"
                placeholder="Qual é o local de partida?"
                className="bg-transparent w-full outline-none"
              />
            </div>

            {/* Campo Destino */}
            <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg">
              <MapPinIcon className="w-5 h-5 text-primary" />
              <input
                type="text"
                placeholder="Para onde você quer ir?"
                className="bg-transparent w-full outline-none"
              />
            </div>

            {/* Endereços Recentes/Favoritos */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Recentes</h3>
              {['Casa', 'Trabalho', 'Academia'].map((place) => (
                <button
                  key={place}
                  className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 rounded-lg"
                >
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                  <div className="text-left">
                    <p className="font-medium">{place}</p>
                    <p className="text-sm text-gray-500">Endereço completo aqui</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 