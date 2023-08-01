<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class cartaorequest extends FormRequest
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
            'apelido'=>[
                'required',
                'string',
                'max:200',
                'min:1',    
            ],
            'numerocartao'=>[
                'required',
                'numeric', 
                'min_digits:12',
                'max_digits:12',
            ],        
            'cvv'=>[
                'required',
                'numeric', 
                'min_digits:3',
                'max_digits:3',

            ],
            'datavencimento'=>[
                'required',
                'date',
                
            ],
            'nometitular'=>[
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
            'numerocartao.required' => 'o numero do cartão é obrigatório',
            'numerocartao.numeric' => 'o número do cartão não pode conter letras',
            'numerocartao.min_digits' => 'o numero do cartão deve ser de 12 dígitos',
            'numerocartao.max_digits' => 'o numero do cartão deve ser de 12 dígitos',
            'cvv.required' => 'o numero do CVV é obrigatório',
            'cvv.max_digits' => 'o número do CVV deve ter 3 dígitos',
            'cvv.min_digits' => 'o número do CVV deve ter 3 dígitos',
            'datavencimento.required' => 'a data de vencimento é obrigatória',
            'datavencimento.date' => 'não altere o tipo dos formulários',
            'nometitular.required' => 'o campo apelido é obrigatório',
            'nometitular.max' => 'o apelido não pode ter mais que 200 caracteres',
        ];
        }
        
}

