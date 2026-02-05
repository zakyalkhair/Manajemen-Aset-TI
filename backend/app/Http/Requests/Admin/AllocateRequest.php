<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class AllocateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // auth + role sudah di middleware
    }

    public function rules(): array
    {
        return [
            'qty_to_allocate' => ['required', 'integer', 'min:1'],
            'note' => ['nullable', 'string', 'max:255'],
        ];
    }
}
