<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Projeto;

class ProjetosTableSeeder extends Seeder
{
    public function run()
    {
            $projetos = [
                [
                    'titulo' => 'Desenvolvimento de Teste de Diagnóstico Rápido',
                    'descricao' => 'Criação de um teste rápido e eficiente para detecção de doenças.',
                    'data_inicial' => '2022-05-01',
                    'data_final' => null,
                    'status' => 'Em andamento',
                ],
                [
                    'titulo' => 'Pesquisa sobre Terapia Genética',
                    'descricao' => 'Estudo dos mecanismos de terapia genética para o tratamento de doenças genéticas.',
                    'data_inicial' => '2022-07-15',
                    'data_final' => null,
                    'status' => 'Em andamento',
                ],
                [
                    'titulo' => 'Desenvolvimento de Biomarcadores para Câncer',
                    'descricao' => 'Identificação e validação de biomarcadores para diagnóstico precoce de câncer.',
                    'data_inicial' => '2022-09-10',
                    'data_final' => null,
                    'status' => 'Em andamento',
                ],
                [
                    'titulo' => 'Pesquisa sobre Medicina Regenerativa',
                    'descricao' => 'Estudo e desenvolvimento de terapias para regenerar tecidos danificados.',
                    'data_inicial' => '2023-08-10',
                    'data_final' => null,
                    'status' => 'Em andamento',
                ],
            ];

            foreach ($projetos as $projeto) {
                $projetoCriado = Projeto::create($projeto);

                if ($projetoCriado) {
                    $itens = [
                        [
                            'nome' => 'Jalecos descartáveis',
                            'quantidade' => 10,
                            'descricao' => 'Roupas de proteção usadas para cobrir o corpo e prevenir a contaminação.',
                        ],
                        [
                            'nome' => 'Luvas descartáveis',
                            'quantidade' => 50,
                            'descricao' => 'Luvas de uso único para proteger as mãos de substâncias químicas e biológicas.',
                        ],
                        [
                            'nome' => 'Toucas descartáveis',
                            'quantidade' => 20,
                            'descricao' => 'Toucas utilizadas para evitar contaminação.',
                        ],
                        [
                            'nome' => 'Propé',
                            'quantidade' => 30,
                            'descricao' => 'Equipamento de proteção para calçados, que veda o solado evitando contaminações ou sujeiras trazidas para dentro de um ambiente esterilizado.',
                        ],

                        // Adicione os itens desejados para cada projeto aqui...
                        [
                            'nome' => 'Item 1',
                            'quantidade' => 5,
                            'descricao' => 'Descrição do Item 1',
                        ],
                        [
                            'nome' => 'Item 2',
                            'quantidade' => 10,
                            'descricao' => 'Descrição do Item 2',
                        ],

                    ];

                    foreach ($itens as $item) {
                        $projetoCriado->itens()->create($item); //Todos projetos terão esses itens
                    }
                }
            }
        }
    }
