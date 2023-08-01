<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class editprodutorequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'nome'=>[
                'required',
                'string',
                'max:200',
                'min:1',    
            ],
            'tipo'=>[
                'required',
                'string', 
                'min:1',
                'max:100',
            ],        
        'descricao'=>[
            'min:0',
            'max:1000',

        ],
        'valor'=>[
            'required',
            'decimal:2',
            'min:0,00',
            'max:9999,99',
        ],
        'quantidade'=>[
            'required',
            'integer',
            'min:0',
            'max:2147483647'
        ],
        ];
    }
    public function messages()
    {
        return [
            'nome.required' => 'o campo nome é obrigatório',
            'nome.max' => 'o nome não pode ter mais que 200 caracteres',
            'tipo.required' => 'Não altere o campo de tipo',
            'tipo.string' => 'Não altere o campo de tipo',
            'tipo.min' => 'Não altere o campo de tipo',
            'tipo.max' => 'Não altere o campo de tipo',
            'descricao.max' => 'o máximo de caracteres da descrição é 1000',
            'valor.required' => 'o valor é obrigatório',
            'valor.decimal' => 'o valor deve ser um numero decimal com duas casas após a vírgula',
            'valor.max' => 'o preço máximo de produto é 9999,99',
            'valor.min' => 'o preço não pode ser negativo',
            'quantidade.required' => 'a quantidade de produtos no estoque é obrigatória',
            'quantidade.integer' => 'a quantidade de produtos deve ser um número inteiro',
            'quantidade.min' => 'o numero de produtos não pode ser menor que 0',
            'quantidade.max' => 'o numero de produtos não pode ser tão grande',
        ];
    }
}
