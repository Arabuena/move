import { useState } from 'react';
import PassengerLayout from '../../components/layout/PassengerLayout';
import AddressSearch from '../../components/passenger/AddressSearch';
import Map from '../../components/Map';
import { GoogleMapsWrapper } from '../../components/GoogleMapsWrapper';

export default function PassengerHome() {
  const [searchStep, setSearchStep] = useState('initial'); // initial, searching, selecting-car

  return (
    <PassengerLayout>
      {/* Container Principal */}
      <div className="relative h-screen">
        {/* Mapa como Background */}
        <div className="absolute inset-0">
          <GoogleMapsWrapper>
            <Map />
          </GoogleMapsWrapper>
        </div>

        {/* Interface Sobreposta */}
        <div className="relative z-10">
          {/* Busca de Endereço */}
          <AddressSearch />

          {/* Painel de Seleção de Carro (aparece após selecionar destino) */}
          {searchStep === 'selecting-car' && (
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg p-4">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Escolha sua viagem</h2>
                
                {/* Tipos de Carro */}
                <div className="space-y-2">
                  {['Move X', 'Move Comfort', 'Move Black'].map((type) => (
                    <button
                      key={type}
                      className="flex items-center justify-between w-full p-4 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img 
                          src={`/cars/${type.toLowerCase()}.png`} 
                          alt={type}
                          className="w-16 h-16 object-contain"
                        />
                        <div>
                          <p className="font-medium">{type}</p>
                          <p className="text-sm text-gray-500">4 min</p>
                        </div>
                      </div>
                      <p className="font-medium">R$ 24,00</p>
                    </button>
                  ))}
                </div>

                {/* Botão Solicitar */}
                <button className="w-full bg-primary text-white py-4 rounded-lg font-medium">
                  Solicitar Move
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PassengerLayout>
  );
} 