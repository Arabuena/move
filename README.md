# Move

App de mobilidade urbana que conecta passageiros e motoristas, com interface administrativa para monitoramento e suporte.

## 🎨 Design System

### Cores
- **Principal**: #7C3AED (Roxo)
- **Secundária**: #9F67FF (Roxo claro)
- **Background**: #F3F4F6 (Cinza claro)
- **Texto**: #1F2937 (Cinza escuro)
- **Sucesso**: #10B981 (Verde)
- **Erro**: #EF4444 (Vermelho)
- **Alerta**: #F59E0B (Amarelo)

## 🚀 Funcionalidades

### App Passageiro
- [ ] Cadastro/Login
- [ ] Solicitar corrida
- [ ] Ver motoristas próximos
- [ ] Acompanhar corrida em tempo real
- [ ] Pagamento (cartão/dinheiro)
- [ ] Avaliação do motorista
- [ ] Histórico de corridas
- [ ] Chat com motorista
- [ ] Suporte

### App Motorista
- [ ] Cadastro/Login com validação de documentos
- [ ] Modo disponível/indisponível
- [ ] Aceitar/recusar corridas
- [ ] Navegação com GPS
- [ ] Chat com passageiro
- [ ] Histórico de ganhos
- [ ] Relatórios diários/semanais
- [ ] Suporte

### Painel Administrativo
- [ ] Dashboard em tempo real
- [ ] Monitoramento de corridas ativas
- [ ] Gestão de usuários (passageiros/motoristas)
- [ ] Análise de métricas
- [ ] Sistema de suporte
- [ ] Gestão de pagamentos
- [ ] Relatórios e analytics

## 💻 Tecnologias

### Frontend (Web/Admin)
- Next.js 14
- Tailwind CSS
- Google Maps API
- Socket.io (tempo real)
- Redux Toolkit (estado)
- React Query (cache/requests)

### Backend
- Node.js/Express
- MongoDB
- Socket.io
- JWT Authentication
- Stripe (pagamentos)
- Redis (cache)

### Mobile (React Native)
- Expo
- Google Maps
- Geolocalização
- Push Notifications
- Chat em tempo real

### Infraestrutura
- Deploy: Render
- Storage: AWS S3
- CDN: Cloudflare
- Monitoramento: Sentry

## 📱 Fluxo Principal

1. **Passageiro**
   - Abre o app
   - Define origem/destino
   - Recebe previsão de preço
   - Solicita corrida
   - Acompanha motorista chegando
   - Realiza a viagem
   - Finaliza com pagamento/avaliação

2. **Motorista**
   - Fica online
   - Recebe solicitação
   - Aceita corrida
   - Navega até passageiro
   - Inicia corrida
   - Segue até destino
   - Finaliza corrida

3. **Admin**
   - Monitora corridas ativas
   - Visualiza métricas em tempo real
   - Gerencia suporte
   - Resolve problemas
   - Analisa relatórios

## 🛠️ Próximos Passos

1. Setup inicial do projeto
2. Autenticação e perfis
3. Integração com Google Maps
4. Sistema de corridas básico
5. Chat e notificações
6. Pagamentos
7. Painel administrativo
8. Apps mobile
9. Testes e otimizações
10. Deploy e monitoramento

## 📈 Métricas Importantes

- Número de corridas
- Tempo médio de espera
- Taxa de cancelamento
- Avaliações médias
- Ganhos dos motoristas
- Satisfação dos usuários
- Tempo de resposta do suporte

## 🔒 Segurança

- Verificação de documentos
- Criptografia de dados
- Monitoramento de fraudes
- Backup automático
- Logs de atividades
- Proteção de dados (LGPD)