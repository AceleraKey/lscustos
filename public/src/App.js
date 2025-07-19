import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, AreaChart, Area
} from 'recharts';

// Componente para o Gantt Chart simplificado
const GanttChart = ({ tasks }) => {
  // Definir meses para o eixo X
  const months = ['Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul']; // 12 meses
  const monthMap = {
    'Ago': 0, 'Set': 1, 'Out': 2, 'Nov': 3, 'Dez': 4, 'Jan': 5, 'Fev': 6, 'Mar': 7, 'Abr': 8, 'Mai': 9, 'Jun': 10, 'Jul': 11
  };

  const taskColors = {
    'Desenvolvimento da Plataforma': '#A87C00', // Dourado Escuro
    'Aquisição de Equipamentos': '#C09F40', // Tom Bronze
    'Contratação da Equipe Fixa': '#D4AF37', // Amarelo/Dourado mais claro
    'Marketing de Lançamento': '#8B4513', // Marrom
    'Operação Mensal Contínua': '#607D8B', // Azul acinzentado
    'Evento Carnaval': '#D32F2F', // Vermelho sóbrio
    'Estruturação Legal': '#424242' // Cinza escuro
  };


  return (
    <div className="w-full overflow-x-auto p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Roadmap de Implementação (Gantt Simplificado)</h3>
      <div className="flex flex-col">
        {/* Header de meses */}
        <div className="flex border-b border-gray-300 pb-2 mb-2">
          <div className="w-40 flex-shrink-0 text-sm font-medium text-gray-600">Atividade</div>
          {months.map((month, index) => (
            <div key={index} className="flex-1 text-center text-sm font-medium text-gray-600">{month}</div>
          ))}
        </div>

        {/* Linhas de tarefas */}
        {tasks.map((task, taskIndex) => (
          <div key={taskIndex} className="flex items-center mb-2 group relative">
            <div className="w-40 flex-shrink-0 text-sm text-gray-700 pr-2">{task.name}</div>
            <div className="flex-1 flex h-6">
              {months.map((month, monthIndex) => {
                const startMonthIndex = monthMap[task.startMonth];
                const endMonthIndex = monthMap[task.endMonth];
                const isActive = monthIndex >= startMonthIndex && monthIndex <= endMonthIndex;
                return (
                  <div
                    key={monthIndex}
                    className={`flex-1 h-full rounded-sm ${isActive ? 'relative' : 'bg-gray-200'}`}
                    style={{ backgroundColor: isActive ? taskColors[task.name] || '#607D8B' : '#E0E0E0' }}
                  >
                    {/* Tooltip para detalhes dos profissionais */}
                    {isActive && task.professionals && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max p-2 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                        {task.professionals.map((prof, pIdx) => (
                          <div key={pIdx}>{prof}</div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // --- Paleta de Cores Dourado/Bronze ---
  const colors = {
    primaryGold: '#A87C00', // Dourado Escuro para títulos e destaques
    secondaryGold: '#C09F40', // Tom Bronze para elementos secundários
    tertiaryGold: '#D4AF37', // Amarelo/Dourado mais claro para gráficos
    darkBrown: '#8B4513', // Marrom para linhas acumuladas
    lightGray: '#F5F5F5', // Fundo geral
    mediumGray: '#E0E0E0', // Bordas e grades
    textDark: '#333333', // Texto principal
    textLight: '#FFFFFF', // Texto em fundos escuros
    accentRed: '#D32F2F', // Vermelho sóbrio para alertas/carnaval
    lightBlue: '#E3F2FD', // Para fundos de tabelas/cards
    darkBlue: '#0D47A1' // Para texto em azul, se necessário, mas evitar
  };

  // --- Dados do Projeto ---

  // Recálculo detalhado dos custos mensais
  const generateMonthlyCostData = () => {
    const data = [];
    let currentCumulative = 0;
    let cumulativeTeam = 0;
    let cumulativePlatform = 0;
    let cumulativeEquipment = 0;
    let cumulativeCarnaval = 0;
    let cumulativeMarketing = 0;
    let cumulativeInfra = 0;
    let cumulativeAdmin = 0;
    let cumulativeLegal = 0;


    const monthNames = ['Ago (M1)', 'Set (M2)', 'Out (M3)', 'Nov (M4)', 'Dez (M5)', 'Jan (M6)', 'Fev (M7)', 'Mar (M8)', 'Abr (M9)', 'Mai (M10)', 'Jun (M11)', 'Jul (M12)'];

    for (let i = 1; i <= 12; i++) {
      let monthlyCost = 0;
      let teamCost = 0;
      let platformCost = 0;
      let equipmentCost = 0;
      let carnavalCost = 0;
      let marketingCost = 0; // OPEX marketing
      let launchMarketingCost = 0; // CAPEX marketing
      let infraCost = 0;
      let adminCost = 0;
      let legalCost = 0;

      // CAPEX - Desenvolvimento da Plataforma (R$ 150.000)
      if (i === 1 || i === 2) { // Mês 1 (Ago) e Mês 2 (Set)
        platformCost = 75000;
      }

      // CAPEX - Equipamentos de Produção e Transmissão (R$ 175.000)
      if (i === 3) { // Mês 3 (Out)
        equipmentCost = 87500; // 50%
      } else if (i === 4) { // Mês 4 (Nov)
        equipmentCost = 87500; // 50%
      }

      // CAPEX - Estruturação Legal e Administrativa (R$ 12.000)
      if (i === 4) { // Mês 4 (Nov)
        legalCost = 12000;
      }

      // OPEX - Custos Mensais Fixos (começam a partir do Mês 5 - Dez)
      if (i >= 5) {
        teamCost = 24000; // Equipe Fixa
        infraCost = 6000; // Infraestrutura Digital
        marketingCost = 5000; // Marketing Contínuo
        adminCost = 3000; // Administrativo (ajustado)
      }

      // CAPEX - Marketing de Lançamento (R$ 30.000)
      if (i === 7) { // Mês 7 (Fev) - Mês do Carnaval e Lançamento
        launchMarketingCost = 30000;
      }

      // Custo Variável - Carnaval (R$ 148.980)
      if (i === 7) { // Mês 7 (Fev) - Mês do Carnaval
        carnavalCost = 148980;
      }

      let currentMonthly = platformCost + equipmentCost + legalCost + teamCost + infraCost + marketingCost + adminCost + launchMarketingCost + carnavalCost;
      currentCumulative += currentMonthly;

      cumulativeTeam += teamCost;
      cumulativePlatform += platformCost;
      cumulativeEquipment += equipmentCost;
      cumulativeCarnaval += carnavalCost;
      cumulativeMarketing += marketingCost + launchMarketingCost;
      cumulativeInfra += infraCost;
      cumulativeAdmin += adminCost;
      cumulativeLegal += legalCost;


      data.push({
        month: monthNames[i - 1],
        monthly: currentMonthly,
        cumulative: currentCumulative,
        team: teamCost,
        platform: platformCost,
        equipment: equipmentCost,
        carnaval: carnavalCost,
        marketing: marketingCost + launchMarketingCost, // Soma marketing OPEX e CAPEX de lançamento
        infra: infraCost,
        admin: adminCost,
        legal: legalCost,
        cumulativeTeam: cumulativeTeam,
        cumulativePlatform: cumulativePlatform,
        cumulativeEquipment: cumulativeEquipment,
        cumulativeCarnaval: cumulativeCarnaval,
        cumulativeMarketing: cumulativeMarketing,
        cumulativeInfra: cumulativeInfra,
        cumulativeAdmin: cumulativeAdmin,
        cumulativeLegal: cumulativeLegal
      });
    }
    return data;
  };

  const monthlyCostData = generateMonthlyCostData();

  // Dados CAPEX (revisados)
  const capexData = [
    { category: 'Desenvolvimento da Plataforma', cost: 150000, details: 'Criação de plataforma web e apps mobile (iOS/Android), UI/UX, backend, frontend, integração de streaming e pagamento.' },
    { category: 'Equipamentos de Produção e Transmissão', cost: 175000, details: 'Câmeras, lentes, áudio, iluminação, drone, gimbals, computadores de alta performance e acessórios.' }, // Custo atualizado
    { category: 'Estruturação Legal e Administrativa', cost: 12000, details: 'Custos de registro, contratos (artista, patrocinadores), consultoria jurídica inicial.' }, // Custo ajustado
    { category: 'Marketing de Lançamento', cost: 30000, details: 'Campanha de marketing inicial para promover o lançamento da plataforma.' },
  ];

  // Detalhamento de equipamentos (revisado com novos computadores e câmera corporal)
  const equipmentDetails = [
    { item: 'Câmeras Principais', description: '3x Sony ZV-E10, Canon R10 ou similar (excelente custo-benefício para 4K e vídeo)', quantity: 3, unitCost: 8000, totalCost: 24000 },
    { item: 'Lentes', description: '3x Lentes prime e zoom versáteis (Sigma 18-50mm f/2.8, Tamron 28-75mm f/2.8)', quantity: 3, unitCost: 4000, totalCost: 12000 },
    { item: 'Câmeras de Ação', description: '2x GoPro HERO 11 Black ou superior (para ângulos dinâmicos e POV)', quantity: 2, unitCost: 2500, totalCost: 5000 },
    { item: 'Drone', description: '1x DJI Mini 4 Pro ou DJI Air 3 (imagens aéreas de alta qualidade e portabilidade)', quantity: 1, unitCost: 8000, totalCost: 8000 },
    { item: 'Câmera Corporal (Léo)', description: '1x GoPro HERO 11 Black (com Media Mod) + Transmissor de vídeo sem fio (Hollyland Mars 400S Pro) para live de alta qualidade e discrição.', quantity: 1, unitCost: 9000, totalCost: 9000 }, // GoPro (3.5k) + Media Mod (0.5k) + Hollyland (5k)
    { item: 'Equipamentos de Áudio', description: '3x kits de microfone sem fio (Rode Wireless GO II), 2x microfones shotgun (Rode NTG), 1x gravador de áudio portátil (Zoom H4n Pro)', quantity: '-', unitCost: '-', totalCost: 10000 },
    { item: 'Iluminação', description: 'Kit 2x Godox SL60W ou Aputure Amaran 200d (para estúdio e camarim)', quantity: 1, unitCost: 5000, totalCost: 5000 },
    { item: 'Transmissão e Conectividade (Local)', description: 'Switcher de vídeo (Blackmagic ATEM Mini Pro), 3x placas de captura (Elgato Cam Link 4K), cabos HDMI/SDI', quantity: '-', unitCost: '-', totalCost: 6000 },
    { item: 'Estabilização', description: '2x Gimbals (DJI RS 3 Mini ou Zhiyun Crane M3)', quantity: 2, unitCost: 2000, totalCost: 4000 },
    { item: 'Computadores e Armazenamento', description: '1x MacBook Pro M3 Max (edição pesada), 2x Workstations Windows (Ryzen 9/i9 + RTX 4080/4090 - edição/streaming), SSDs NVMe e externos. *Sugestão de modelos de ponta para alta performance.*', quantity: 3, unitCost: 30000, totalCost: 90000 }, // 3 computadores a 30k cada (ajustado para total 90k)
    { item: 'Acessórios Diversos', description: 'Tripés, monopés, baterias extras, cartões de memória de alta velocidade, cases de transporte, monitores de campo', quantity: '-', unitCost: '-', totalCost: 2000 },
  ];
  // Recalcular total de equipamentos para garantir precisão
  const totalEquipmentCostCalculated = equipmentDetails.reduce((sum, item) => sum + item.totalCost, 0);
  // console.log("Total Equipment Cost Calculated:", totalEquipmentCostCalculated); // Para depuração

  // Dados OPEX (Administrativo ajustado para R$ 3.000)
  const opexData = [
    { category: 'Equipe Fixa', description: 'Salários e encargos para a equipe principal (Diretor de Conteúdo, Editor, Social Media, Suporte Técnico)', cost: 24000 },
    { category: 'Infraestrutura Digital', description: 'Hospedagem, CDN, licenças de software (Adobe, etc.)', cost: 6000 },
    { category: 'Marketing Contínuo', description: 'Campanhas de marketing digital para atrair e reter assinantes', cost: 5000 },
    { category: 'Administrativo', description: 'Contabilidade, taxas, despesas gerais administrativas', cost: 3000 }, // Ajustado para R$ 3.000
  ];

  // Dados Custos Carnaval
  const carnavalData = [
    { category: 'Equipe Freelancer', description: 'Cinegrafistas, assistentes, técnico de som, etc. (diárias para 6 dias)', cost: 60000 },
    { category: 'Logística & Viagens', description: 'Passagens, hospedagem e alimentação da equipe em Salvador para 6 dias', cost: 35000 },
    { category: 'Infraestrutura Temporária', description: 'Aluguel de mochilinks para transmissão 4G/5G, geradores de energia (6 dias)', cost: 27000 },
    { category: 'Seguros e Permissões', description: 'Seguro de equipamento para eventos de grande porte e licenças locais', cost: 10000 },
    { category: 'Contingência (10%)', description: 'Fundo para imprevistos durante a transmissão ao vivo do Carnaval', cost: 13200 },
  ];
  const totalCarnavalCost = carnavalData.reduce((sum, item) => sum + item.cost, 0);


  // Dados para o Gantt Chart
  const ganttTasks = [
    { name: 'Desenvolvimento da Plataforma', startMonth: 'Ago', endMonth: 'Set', professionals: ['Desenvolvedores Full-Stack', 'Designers UI/UX', 'Gerente de Projeto'] },
    { name: 'Aquisição de Equipamentos', startMonth: 'Out', endMonth: 'Nov', professionals: ['Diretor de Transmissão', 'Técnico de Suporte', 'Comprador'] },
    { name: 'Contratação da Equipe Fixa', startMonth: 'Dez', endMonth: 'Dez', professionals: ['RH', 'Diretor de Conteúdo', 'Gerente de Projeto'] },
    { name: 'Estruturação Legal', startMonth: 'Nov', endMonth: 'Nov', professionals: ['Advogado', 'Contador'] },
    { name: 'Marketing de Lançamento', startMonth: 'Fev', endMonth: 'Fev', professionals: ['Especialista em Marketing', 'Social Media', 'Assessor de Imprensa'] },
    { name: 'Evento Carnaval', startMonth: 'Fev', endMonth: 'Fev', professionals: ['Diretor de Transmissão', 'Operadores de Câmera', 'Técnico de Áudio', 'Operador de Drone', 'Produtor de Campo', 'Suporte de Rede'] },
    { name: 'Operação Mensal Contínua', startMonth: 'Dez', endMonth: 'Jul', professionals: ['Equipe Fixa', 'Suporte de TI', 'Marketing Digital', 'Administrativo'] },
  ];


  // --- Cálculos Totais ---
  const totalCapex = capexData.reduce((sum, item) => sum + item.cost, 0);
  const totalOpexMonthly = opexData.reduce((sum, item) => sum + item.cost, 0);
  const totalFirstYearCost = monthlyCostData[monthlyCostData.length - 1].cumulative;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="font-sans bg-gray-50 p-5 rounded-lg shadow-xl text-gray-800">
      {/* Cabeçalho com Logo e Título */}
      <div className="flex flex-col items-center mb-8">
        <img src="https://googleusercontent.com/file_content/1" alt="Linkstar Logo" className="w-48 h-auto rounded-lg mb-4" />
        <h1 className="text-center mb-4 text-4xl font-extrabold" style={{ color: colors.primaryGold }}>
          Dashboard Financeiro: Projeto Léo Santana
        </h1>
      </div>

      {/* Navegação por abas */}
      <div className="flex justify-center border-b border-gray-300 pb-2 mb-6">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-5 py-2 text-lg font-semibold border-b-2 transition-all duration-300 rounded-t-lg ${activeTab === 'dashboard' ? 'border-current text-white bg-gradient-to-r from-yellow-700 to-yellow-900' : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
          style={{ borderColor: activeTab === 'dashboard' ? colors.primaryGold : 'transparent', color: activeTab === 'dashboard' ? colors.textLight : colors.textDark }}
        >
          Visão Geral
        </button>
        <button
          onClick={() => setActiveTab('capex')}
          className={`px-5 py-2 text-lg font-semibold border-b-2 transition-all duration-300 rounded-t-lg ${activeTab === 'capex' ? 'border-current text-white bg-gradient-to-r from-yellow-700 to-yellow-900' : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
          style={{ borderColor: activeTab === 'capex' ? colors.primaryGold : 'transparent', color: activeTab === 'capex' ? colors.textLight : colors.textDark }}
        >
          CAPEX (Custos Iniciais)
        </button>
        <button
          onClick={() => setActiveTab('opex')}
          className={`px-5 py-2 text-lg font-semibold border-b-2 transition-all duration-300 rounded-t-lg ${activeTab === 'opex' ? 'border-current text-white bg-gradient-to-r from-yellow-700 to-yellow-900' : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
          style={{ borderColor: activeTab === 'opex' ? colors.primaryGold : 'transparent', color: activeTab === 'opex' ? colors.textLight : colors.textDark }}
        >
          OPEX (Custos Mensais)
        </button>
        <button
          onClick={() => setActiveTab('carnaval')}
          className={`px-5 py-2 text-lg font-semibold border-b-2 transition-all duration-300 rounded-t-lg ${activeTab === 'carnaval' ? 'border-current text-white bg-gradient-to-r from-yellow-700 to-yellow-900' : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
          style={{ borderColor: activeTab === 'carnaval' ? colors.primaryGold : 'transparent', color: activeTab === 'carnaval' ? colors.textLight : colors.textDark }}
        >
          Custos Carnaval
        </button>
        <button
          onClick={() => setActiveTab('dashboards_gerais')}
          className={`px-5 py-2 text-lg font-semibold border-b-2 transition-all duration-300 rounded-t-lg ${activeTab === 'dashboards_gerais' ? 'border-current text-white bg-gradient-to-r from-yellow-700 to-yellow-900' : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
          style={{ borderColor: activeTab === 'dashboards_gerais' ? colors.primaryGold : 'transparent', color: activeTab === 'dashboards_gerais' ? colors.textLight : colors.textDark }}
        >
          Dashboards Gerais
        </button>
      </div>

      {/* Conteúdo das abas */}
      {activeTab === 'dashboard' && (
        <div className="p-6 bg-white rounded-lg shadow-md">
          {/* Cards de Resumo */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
              <h3 className="text-xl font-bold mb-2">Investimento Inicial (CAPEX)</h3>
              <p className="text-4xl font-extrabold">{formatCurrency(totalCapex)}</p>
            </div>
            <div className="bg-gray-600 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
              <h3 className="text-xl font-bold mb-2">Custo Mensal Base (OPEX)</h3>
              <p className="text-4xl font-extrabold">{formatCurrency(totalOpexMonthly)}</p>
            </div>
            <div className="bg-gray-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
              <h3 className="text-xl font-bold mb-2">Custo Adicional Carnaval (6 dias)</h3>
              <p className="text-4xl font-extrabold">{formatCurrency(totalCarnavalCost)}</p>
            </div>
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
              <h3 className="text-xl font-bold mb-2">Custo Total Projetado (1º Ano)</h3>
              <p className="text-4xl font-extrabold">{formatCurrency(totalFirstYearCost)}</p>
            </div>
          </div>

          {/* Gráfico de Desembolso */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Projeção de Desembolso Mensal e Acumulado - Ano 1</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart
                data={monthlyCostData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={colors.mediumGray} />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" stroke={colors.secondaryGold} tickFormatter={value => `R$ ${value / 1000}k`} label={{ value: 'Custo Mensal', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }} />
                <YAxis yAxisId="right" orientation="right" stroke={colors.darkBrown} tickFormatter={value => `R$ ${value / 1000}k`} label={{ value: 'Custo Acumulado', angle: 90, position: 'insideRight', style: { textAnchor: 'middle' } }} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar yAxisId="left" dataKey="monthly" name="Custo Mensal" fill={colors.secondaryGold} barSize={20} radius={[5, 5, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="cumulative" name="Custo Acumulado" stroke={colors.darkBrown} strokeWidth={3} dot={{ r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Tabela de Alocação de Recursos Mês a Mês */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Alocação de Recursos Mês a Mês</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Mês</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Atividade Principal</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Custo Alocado no Mês</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Custo Acumulado</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {monthlyCostData.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.month}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {data.month === 'Ago (M1)' && 'Desenvolvimento da Plataforma (50%)'}
                        {data.month === 'Set (M2)' && 'Desenvolvimento da Plataforma (50% restante)'}
                        {data.month === 'Out (M3)' && 'Aquisição de Equipamentos (50%)'}
                        {data.month === 'Nov (M4)' && 'Aquisição de Equipamentos (50% restante) + Estruturação Legal'}
                        {data.month === 'Dez (M5)' && 'Início da Operação Mensal Completa (Equipe Fixa + OPEX)'}
                        {data.month === 'Jan (M6)' && 'Operação Mensal Contínua'}
                        {data.month === 'Fev (M7)' && 'Operação Mensal + Evento Carnaval + Marketing de Lançamento'}
                        {data.month === 'Mar (M8)' && 'Operação Mensal Contínua'}
                        {data.month === 'Abr (M9)' && 'Operação Mensal Contínua'}
                        {data.month === 'Mai (M10)' && 'Operação Mensal Contínua'}
                        {data.month === 'Jun (M11)' && 'Operação Mensal Contínua'}
                        {data.month === 'Jul (M12)' && 'Operação Mensal Contínua'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(data.monthly)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(data.cumulative)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gantt Chart */}
          <GanttChart tasks={ganttTasks} />
        </div>
      )}

      {/* Aba CAPEX */}
      {activeTab === 'capex' && (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800" style={{ color: colors.primaryGold }}>Custos Iniciais (CAPEX)</h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mb-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-tl-lg">Categoria</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Custo Estimado</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-tr-lg">Detalhes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {capexData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(item.cost)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.details}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-bold">
                  <td className="px-6 py-4 text-sm text-gray-800">TOTAL CAPEX</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{formatCurrency(totalCapex)}</td>
                  <td className="px-6 py-4"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800" style={{ color: colors.primaryGold }}>Detalhamento dos Equipamentos (Custo-Benefício)</h3>
          <p className="text-gray-700 mb-4">
            As câmeras principais sugeridas (Sony ZV-E10, Canon R10) são excelentes para o custo-benefício, entregando qualidade 4K e boa performance em vídeo. Para uma qualidade "melhor" no sentido cinematográfico, seriam necessárias câmeras como Blackmagic URSA Mini Pro ou Sony FX9, com lentes prime de alto valor, o que se enquadraria na "Opção Premium" discutida anteriormente e aumentaria significativamente o CAPEX.
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-tl-lg">Item</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Descrição</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Quantidade</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Custo Unitário</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider rounded-tr-lg">Custo Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {equipmentDetails.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.item}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.description}</td>
                    <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-700">{item.quantity}</td>
                    <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-700">{item.unitCost !== '-' ? formatCurrency(item.unitCost) : '-'}</td>
                    <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-700">{formatCurrency(item.totalCost)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-bold">
                  <td colSpan="4" className="px-6 py-4 text-right text-sm text-gray-800">TOTAL EQUIPAMENTOS</td>
                  <td className="px-6 py-4 text-right text-sm text-gray-800">{formatCurrency(equipmentDetails.reduce((sum, item) => sum + item.totalCost, 0))}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Aba OPEX */}
      {activeTab === 'opex' && (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800" style={{ color: colors.primaryGold }}>Custos Operacionais Mensais (OPEX)</h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-tl-lg">Categoria</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Custo Mensal Estimado</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-tr-lg">Descrição</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {opexData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(item.cost)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.description}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-bold">
                  <td className="px-6 py-4 text-sm text-gray-800">TOTAL OPEX MENSAL BASE</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{formatCurrency(totalOpexMonthly)}</td>
                  <td className="px-6 py-4"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'carnaval' && (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800" style={{ color: colors.primaryGold }}>Custos Adicionais para a Transmissão do Carnaval (6 dias)</h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-tl-lg">Categoria</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Custo Estimado para 6 dias</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-tr-lg">Descrição</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {carnavalData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(item.cost)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.description}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-bold">
                  <td className="px-6 py-4 text-sm text-gray-800">TOTAL ADICIONAL CARNAVAL</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{formatCurrency(totalCarnavalCost)}</td>
                  <td className="px-6 py-4"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Nova Aba: Dashboards Gerais */}
      {activeTab === 'dashboards_gerais' && (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800" style={{ color: colors.primaryGold }}>Dashboards de Custos Detalhados</h2>

          {/* Gráfico de Custos por Categoria (Mensal) */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Evolução Mensal dos Custos por Categoria (Empilhado)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={monthlyCostData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={colors.mediumGray} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={value => `R$ ${value / 1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Area type="monotone" dataKey="platform" stackId="1" stroke={colors.tertiaryGold} fill={colors.tertiaryGold} name="Plataforma (CAPEX)" />
                <Area type="monotone" dataKey="equipment" stackId="1" stroke={colors.secondaryGold} fill={colors.secondaryGold} name="Equipamentos (CAPEX)" />
                <Area type="monotone" dataKey="legal" stackId="1" stroke={colors.darkBrown} fill={colors.darkBrown} name="Legal/Admin (CAPEX)" />
                <Area type="monotone" dataKey="marketing" stackId="1" stroke="#90A4AE" fill="#90A4AE" name="Marketing (CAPEX/OPEX)" />
                <Area type="monotone" dataKey="team" stackId="1" stroke="#607D8B" fill="#607D8B" name="Equipe Fixa (OPEX)" />
                <Area type="monotone" dataKey="infra" stackId="1" stroke="#78909C" fill="#78909C" name="Infra Digital (OPEX)" />
                <Area type="monotone" dataKey="admin" stackId="1" stroke="#B0BEC5" fill="#B0BEC5" name="Administrativo (OPEX)" />
                <Area type="monotone" dataKey="carnaval" stackId="1" stroke={colors.accentRed} fill={colors.accentRed} name="Carnaval (Variável)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Gráficos Separados de Acumulado */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Custo Acumulado - Equipe Fixa</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyCostData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.mediumGray} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={value => `R$ ${value / 1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Line type="monotone" dataKey="cumulativeTeam" stroke="#4A6572" strokeWidth={3} name="Custo Acumulado Equipe" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Custo Acumulado - Equipamentos</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyCostData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.mediumGray} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={value => `R$ ${value / 1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Line type="monotone" dataKey="cumulativeEquipment" stroke={colors.primaryGold} strokeWidth={3} name="Custo Acumulado Equip." dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Custo Acumulado - Plataforma</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyCostData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.mediumGray} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={value => `R$ ${value / 1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Line type="monotone" dataKey="cumulativePlatform" stroke={colors.tertiaryGold} strokeWidth={3} name="Custo Acumulado Plataforma" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Custo Acumulado - Carnaval</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyCostData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.mediumGray} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={value => `R$ ${value / 1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Line type="monotone" dataKey="cumulativeCarnaval" stroke={colors.accentRed} strokeWidth={3} name="Custo Acumulado Carnaval" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Custo Acumulado - Marketing</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyCostData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.mediumGray} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={value => `R$ ${value / 1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Line type="monotone" dataKey="cumulativeMarketing" stroke="#90A4AE" strokeWidth={3} name="Custo Acumulado Marketing" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Custo Acumulado - Infraestrutura Digital</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyCostData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.mediumGray} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={value => `R$ ${value / 1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Line type="monotone" dataKey="cumulativeInfra" stroke="#78909C" strokeWidth={3} name="Custo Acumulado Infra" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Custo Acumulado - Administrativo</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyCostData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.mediumGray} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={value => `R$ ${value / 1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Line type="monotone" dataKey="cumulativeAdmin" stroke="#B0BEC5" strokeWidth={3} name="Custo Acumulado Admin" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Custo Acumulado - Legal e Burocrático (CAPEX)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyCostData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.mediumGray} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={value => `R$ ${value / 1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Line type="monotone" dataKey="cumulativeLegal" stroke="#424242" strokeWidth={3} name="Custo Acumulado Legal" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Resumo Final */}
      <div className="mt-10 p-6 bg-gray-700 rounded-lg border border-gray-600 shadow-md text-white">
        <h2 className="mb-4 text-2xl font-bold" style={{ color: colors.primaryGold }}>Resumo Financeiro do Primeiro Ano</h2>
        <ul className="list-none p-0 space-y-3">
          <li className="text-lg">
            <strong className="text-gray-300">Total de Investimento Inicial (CAPEX):</strong> {formatCurrency(totalCapex)}
          </li>
          <li className="text-lg">
            <strong className="text-gray-300">Total de Custos Operacionais (OPEX) Fixos (12 meses):</strong> {formatCurrency(totalOpexMonthly * 12)}
          </li>
          <li className="text-lg">
            <strong className="text-gray-300">Custo Adicional do Carnaval:</strong> {formatCurrency(totalCarnavalCost)}
          </li>
          <li className="text-xl font-bold mt-4 pt-4 border-t border-gray-500">
            <strong className="text-red-400">CUSTO TOTAL PROJETADO PARA O PRIMEIRO ANO:</strong> {formatCurrency(totalFirstYearCost)}
          </li>
        </ul>
        <p className="text-sm text-gray-400 mt-6">
          <em>Disclaimer: Os valores apresentados são estimativas baseadas em pesquisas de mercado e podem variar. Recomenda-se obter cotações formais para um planejamento financeiro final e preciso.</em>
        </p>
      </div>
    </div>
  );
};

export default App;
