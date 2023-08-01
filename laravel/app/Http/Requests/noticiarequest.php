<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class noticiarequest extends FormRequest
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
            'imagem'=>[
                'required',
                'image',
    
            ],
            'descricao'=>[
                'min:0',
                'max:1000',
    
            ],
            'titulo'=>[
                'required',
                'string',
                'max:255',
                'min:1',    
            ],
        ];
    }
    public function messages()
    {
        return [
            'titulo.required' => 'o campo título é obrigatório',
            'titulo.max' => 'o título não pode ter mais que 255 caracteres',
            'descricao.max' => 'o máximo de caracteres da descrição é 1000',
            'imagem.required' => 'a imagem da notícia é obrigatória',
        ];
    }
}
