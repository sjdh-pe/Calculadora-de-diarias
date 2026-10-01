export const cargos = [
      { nome: 'Secretário de Estado / equivalente', grupo: '1' },
      { nome: 'Secretário Executivo / equivalente', grupo: '1' },
      { nome: 'Cargo em comissão / chefia / assessoramento', grupo: '2' },
      { nome: 'Cargo que exija nível superior', grupo: '2' },
      { nome: 'Demais cargos', grupo: '3' }
    ];


export const destinos = [
      'Capitais (exceto Recife)',
      'Brasília/Manaus',
      'SP/RJ/BH/POA/Belém/Fortaleza/Salvador',
      'Demais cidades fora do Estado',
      'Dentro do Estado'
    ];


export const tabela = {
      '1': {
        integral: {
          'Capitais (exceto Recife)': 424.22,
          'Brasília/Manaus': 475.13,
          'SP/RJ/BH/POA/Belém/Fortaleza/Salvador': 449.67,
          'Demais cidades fora do Estado': 339.36,
          'Dentro do Estado': 241.86
        },
        parcial: {
          'Capitais (exceto Recife)': 127.26,
          'Brasília/Manaus': 142.53,
          'SP/RJ/BH/POA/Belém/Fortaleza/Salvador': 134.90,
          'Demais cidades fora do Estado': 101.80,
          'Dentro do Estado': 72.54
        }
      },
      '2': {
        integral: {
          'Capitais (exceto Recife)': 313.28,
          'Brasília/Manaus': 350.87,
          'SP/RJ/BH/POA/Belém/Fortaleza/Salvador': 332.08,
          'Demais cidades fora do Estado': 250.62,
          'Dentro do Estado': 170.12
        },
        parcial: {
          'Capitais (exceto Recife)': 94.00,
          'Brasília/Manaus': 105.28,
          'SP/RJ/BH/POA/Belém/Fortaleza/Salvador': 99.64,
          'Demais cidades fora do Estado': 75.20,
          'Dentro do Estado': 57.00
        }
      },
      '3': {
        integral: {
          'Capitais (exceto Recife)': 215.40,
          'Brasília/Manaus': 241.25,
          'SP/RJ/BH/POA/Belém/Fortaleza/Salvador': 228.32,
          'Demais cidades fora do Estado': 172.32,
          'Dentro do Estado': 120.00
        },
        parcial: {
          'Capitais (exceto Recife)': 64.62,
          'Brasília/Manaus': 72.37,
          'SP/RJ/BH/POA/Belém/Fortaleza/Salvador': 68.50,
          'Demais cidades fora do Estado': 57.00,
          'Dentro do Estado': 55.00
        }
      }
    };
