<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ItensTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
        public function run()
    {
        $itens = [
            // Equipamentos de segurança
            [
                'nome' => 'Jalecos descartáveis',
                'quantidade' => 10,
                'descricao' => 'Roupas de proteção usadas para cobrir o corpo e prevenir a contaminação.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],

            [
                'nome' => 'Luvas descartáveis',
                'quantidade' => 50,
                'descricao' => 'Luvas de uso único para proteger as mãos de substâncias químicas e biológicas.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],

            [
                'nome' => 'Toucas descartáveis',
                'quantidade' => 20,
                'descricao' => 'Toucas utilizadas para evitar contaminação.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],

            [
                'nome' => 'Propé',
                'quantidade' => 30,
                'descricao' => 'Equipamento de proteção para calçados, que veda o solado evitando contaminações ou sujeiras trazidas para dentro de um ambiente esterilizado.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],

            [
                'nome' => 'Óculos de proteção',
                'quantidade' => 15,
                'descricao' => 'Óculos projetados para proteger os olhos de respingos e produtos químicos.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Máscaras faciais ou respiradores',
                'quantidade' => 25,
                'descricao' => 'Equipamentos usados para proteger as vias respiratórias dos gases, vapores ou partículas nocivas.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],

            // Meios de cultura
            [
                'nome' => 'Meio de cultura de ágar nutritivo',
                'quantidade' => 5,
                'descricao' => 'Meio utilizado para o crescimento geral de microorganismos.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Meio de cultura seletivo, como o MacConkey agar',
                'quantidade' => 3,
                'descricao' => 'Meio que permite o crescimento seletivo de certos tipos de bactérias, inibindo outros.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Meio de cultura diferencial, como o agar sangue',
                'quantidade' => 4,
                'descricao' => 'Meio que permite diferenciar diferentes espécies bacterianas com base em características de crescimento e hemólise.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Meio de cultura mínimo',
                'quantidade' => 2,
                'descricao' => 'Meio contendo apenas os nutrientes essenciais necessários para o crescimento de microorganismos.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Meio de cultura anaeróbico',
                'quantidade' => 1,
                'descricao' => 'Meio utilizado para cultivar microorganismos que requerem condições de ausência de oxigênio.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Meio de cultura para células eucarióticas, como o DMEM (Dulbecco\'s Modified Eagle Medium)',
                'quantidade' => 3,
                'descricao' => 'Meio utilizado para o crescimento de células de mamíferos em cultura.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],

            // Reagentes
            [
                'nome' => 'Ácido clorídrico (HCl)',
                'quantidade' => 1,
                'descricao' => 'Reagente usado para ajuste de pH ou reações químicas específicas.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Ácido acético',
                'quantidade' => 1,
                'descricao' => 'Reagente usado para ajuste de pH ou reações químicas específicas.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Hidróxido de sódio (NaOH)',
                'quantidade' => 1,
                'descricao' => 'Reagente usado para ajuste de pH ou reações químicas específicas.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Cloreto de sódio (NaCl)',
                'quantidade' => 1,
                'descricao' => 'Reagente utilizado para a preparação de soluções salinas e meios de cultura.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Fenolftaleína',
                'quantidade' => 1,
                'descricao' => 'Indicador químico utilizado para determinar o ponto final de uma reação ácido-base.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Azul de bromotimol',
                'quantidade' => 1,
                'descricao' => 'Indicador químico utilizado para monitorar o pH em meios de cultura ou soluções.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],

            // Solventes
            [
                'nome' => 'Água',
                'quantidade' => 1,
                'descricao' => 'Solvente universal usado para dissolver uma ampla variedade de substâncias.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Etanol',
                'quantidade' => 1,
                'descricao' => 'Solvente usado para a dissolução de compostos orgânicos e esterilização de superfícies.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Metanol',
                'quantidade' => 1,
                'descricao' => 'Solvente utilizado em análises e extração de compostos orgânicos.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Acetona',
                'quantidade' => 1,
                'descricao' => 'Solvente comumente usado para dissolver compostos orgânicos e limpeza de equipamentos de vidro.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Éter',
                'quantidade' => 1,
                'descricao' => 'Solvente volátil utilizado para extração de compostos orgânicos.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],

            // Anticorpos
            [
                'nome' => 'Anticorpos anti-CD4',
                'quantidade' => 5,
                'descricao' => 'Anticorpos utilizados para identificar e quantificar células T CD4+ no sistema imunológico.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Anticorpos anti-CD8',
                'quantidade' => 5,
                'descricao' => 'Anticorpos utilizados para identificar e quantificar células T CD8+ no sistema imunológico.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Anticorpos anti-CD20',
                'quantidade' => 5,
                'descricao' => 'Anticorpos utilizados para identificar e quantificar células B no sistema imunológico.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Anticorpos anti-HER2',
                'quantidade' => 5,
                'descricao' => 'Anticorpos utilizados para identificar e quantificar a proteína HER2 em células cancerosas de mama.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],

            // Enzimas
            [
                'nome' => 'Amilase',
                'quantidade' => 1,
                'descricao' => 'Enzima que catalisa a quebra do amido em moléculas menores.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Lipase',
                'quantidade' => 1,
                'descricao' => 'Enzima que catalisa a quebra de lipídios em ácidos graxos e glicerol.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'DNA polimerase',
                'quantidade' => 1,
                'descricao' => 'Enzima utilizada para a síntese de DNA durante a amplificação por PCR ou replicação do DNA.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'RNA polimerase',
                'quantidade' => 1,
                'descricao' => 'Enzima responsável pela síntese de RNA a partir de uma matriz de DNA.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Protease',
                'quantidade' => 1,
                'descricao' => 'Enzima que catalisa a quebra de proteínas em aminoácidos.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Ligase',
                'quantidade' => 1,
                'descricao' => 'Enzima utilizada para ligar fragmentos de DNA durante a clonagem ou reações de PCR.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],

            // Substratos
            [
                'nome' => 'Amido (para a amilase)',
                'quantidade' => 1,
                'descricao' => 'Substrato que é quebrado pela amilase, resultando em moléculas menores de açúcar.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Triglicerídeos (para a lipase)',
                'quantidade' => 1,
                'descricao' => 'Substrato que é quebrado pela lipase, resultando em ácidos graxos e glicerol.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'DNA (para a DNA polimerase)',
                'quantidade' => 1,
                'descricao' => 'Molécula que serve como molde para a síntese de DNA pela DNA polimerase.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'RNA (para a RNA polimerase)',
                'quantidade' => 1,
                'descricao' => 'Molécula que serve como molde para a síntese de RNA pela RNA polimerase.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Proteínas (para a protease)',
                'quantidade' => 1,
                'descricao' => 'Moléculas de proteína que são quebradas em aminoácidos pela ação da protease.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],

            // Kits de diagnóstico
            [
                'nome' => 'Kit de diagnóstico de glicose no sangue',
                'quantidade' => 1,
                'descricao' => 'Kits que permitem a medição rápida e fácil dos níveis de glicose no sangue.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Kit de diagnóstico de colesterol',
                'quantidade' => 1,
                'descricao' => 'Kits que permitem a medição dos níveis de colesterol no sangue.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Kit de diagnóstico de PCR (Reação em Cadeia da Polimerase)',
                'quantidade' => 1,
                'descricao' => 'Kits que contêm todos os reagentes necessários para realizar a amplificação de ácidos nucleicos por PCR.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
            [
                'nome' => 'Kit de diagnóstico de ELISA (ensaio imunoenzimático)',
                'quantidade' => 1,
                'descricao' => 'Kits que permitem a detecção e quantificação de antígenos ou anticorpos específicos por meio de reações imunoenzimáticas.',
                'projeto_id' => 1, // Defina o ID do projeto correspondente
            ],
        ];

        foreach ($itens as $item) {
            $projetoId = $item['projeto_id'];
            unset($item['projeto_id']);

            $itemId = DB::table('itens')->insertGetId($item);

            DB::table('item_projeto')->insert([
                'item_id' => $itemId,
                'projeto_id' => $projetoId,
            ]);
        }
    }
}
