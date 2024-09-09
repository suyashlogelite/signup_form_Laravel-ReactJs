<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Signup extends Model
{
    use HasFactory;

    protected $table = "signup_tbl";

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
    ];
}
