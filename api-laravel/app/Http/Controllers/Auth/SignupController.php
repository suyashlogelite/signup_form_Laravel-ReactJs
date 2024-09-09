<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Signup;
use App\Models\OtpModel;
use Illuminate\Support\Facades\Validator;
use App\Mail\SendEmail;
use Illuminate\Support\Facades\Mail;

class SignupController extends Controller
{
    public function sendOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "email" => "required|email|unique:signup_tbl",
            "first_name" => "required|regex:/^[\pL\s\-]+$/u",
            "last_name" => "required|regex:/^[\pL\s\-]+$/u"
        ], [
            'email.required' => '',
            'email.email' => '',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 422,
                "errors" => $validator->messages()
            ], 422);
        }

        $otptbl = new OtpModel();

        $email = $request->email;

        $otp = rand(100000, 999999);
        $otp_expiry = time() + 15 * 60;

        if ($email) {
            Mail::to($email)->send(new SendEmail($otp));
            $otptbl->otp = $otp;
            $otptbl->otp_expiry = $otp_expiry;
            $otptbl->save();

            return response()->json([
                "status" => 200,
                "message" => "OTP Sent Successfully"
            ], 200);
        } else {
            return response()->json([
                "status" => false,
                "message" => "Not able to get your email!!"
            ]);
        }
    }

    public function otpVerify(Request $request)
    {
        $sendedOtp = $request->otp;
        $otpFetch = OtpModel::latest()->first();
        $dbOtp = $otpFetch->otp;

        if ($dbOtp == $sendedOtp) {
            $otpFetch->otp_verify = "1";
            $otpFetch->save();

            return response()->json([
                "status" => 200,
                "message" => "verified successfully"
            ], 200);
        }
        return response()->json([
            "status" => false,
            "message" => "Invalid OTP!"
        ]);
    }
}
