<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class enderecorequest extends FormRequest
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
            'cep'=>[
                'required',
                'numeric',
                'max_digits:8',
                'min_digits:8', 
            ],
            'numero'=>[
                'required',
                'numeric',
                'max_digits:4',
                'min_digits:1', 
            ],
            
            'cidade'=>[
                'required',
                'string',
                'max:200',
                'min:1', 
            ],
            'bairro'=>[
                'required',
                'string',
                'max:200',
                'min:1', 
            ],

            'rua'=>[
                'required',
                'string',
                'max:200',
                'min:1', 
            ],
            'apelido'=>[
                'required',
                'string',
                'max:200',
                'min:1',    
            ],
        ];
    }
    public function messages(){
        return [
            'apelido.required' => 'o campo apelido é obrigatório',
            'apelido.max' => 'o apelido não pode ter mais que 200 caracteres',
            'cep.required' => 'o numero do cep é obrigatório',
            'cep.numeric' => 'o número do cep não pode conter letras',
            'cep.min_digits' => 'o numero do cep deve ser de 8 dígitos',
            'cep.max_digits' => 'o numero do cep deve ser de 8 dígitos',
            'numero.required' => 'o numero do endereço é obrigatório',
            'numero.numeric' => 'o número do endereço não pode conter letras',
            'numero.max_digits' => 'o numero do endereço deve ser menor que 9999',
            'estado.required' => 'o campo estado é obrigatório',
            'estado.max' => 'o estado não pode ter mais que 100 caracteres',
            'cidade.required' => 'o campo cidade é obrigatório',
            'cidade.max' => 'o cidade não pode ter mais que 200 caracteres',
            'bairro.required' => 'o campo bairro é obrigatório',
            'bairro.max' => 'o bairro não pode ter mais que 200 caracteres',
            'rua.required' => 'o campo rua é obrigatório',
            'rua.max' => 'o rua não pode ter mais que 200 caracteres',
          
        ];
        }
}
