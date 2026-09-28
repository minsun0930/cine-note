import Button from "@/components/common/Button";
import { FormInput } from "@/components/common/FormInput";
import { supabase } from "@/supabase/supabaseClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "현재 비밀번호를 입력해주세요."),
    newPassword: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .max(20, "비밀번호는 최대 20자까지 가능합니다.")
      .refine((val) => {
        //영문, 숫자, 특수문자 중 2개 이상 조합 체크
        const hasLetter = /[a-zA-z]/.test(val);
        const hasNumber = /[0-9]/.test(val);
        const hasSpecial = /[!@#$%^&*]/.test(val);

        const conditionsCount = [hasLetter, hasNumber, hasSpecial].filter(
          Boolean,
        ).length;
        return conditionsCount >= 2;
      }, "영문, 숫자, 특수문자 중 2개 이상 조합해주세요."),

    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ChangePassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormValues) => {
    const { data: userData } = await supabase.auth.getUser();
    const email = userData.user?.email;

    if (!email) {
      alert("로그인 정보를 찾을 수 없습니다.");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: data.currentPassword,
    });

    if (signInError) {
      alert("현재 비밀번호가 일치하지 않습니다.");
      return;
    }

    const { error : updateError} = await supabase.auth.updateUser({
      password: data.newPassword,
    });

    if (updateError) {
      alert(updateError.message);
      return;
    }

    
    const { error: signOutError } = await supabase.auth.signOut();
    if(signOutError){
      alert("로그아웃 중 오류가 발생했습니다.");
      return;
    }

    alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인 해주세요.");
    navigate("/login");
  };

  return (
    <div className="max-w-87 w-full flex flex-col justify-center items-center mx-auto my-14">
      <div className="felx items-center justify-center flex-col w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">비밀번호 변경</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="pb-3.5 max-w-87">
          <div className="flex flex-col gap-3.5 mb-6">
            <FormInput
              placeholder="현재 비밀번호 확인"
              type="password"
              registration={register("currentPassword")}
              error={errors.currentPassword?.message as string}
              //  error={errors.userId?.message as string}
            />
            <FormInput
              placeholder="새 비밀번호"
              type="password"
              registration={register("newPassword")}
              error={errors.newPassword?.message as string}
            />
            <FormInput
              placeholder="새 비밀번호"
              type="password"
              registration={register("confirmPassword")}
              error={errors.confirmPassword?.message as string}
            />
          </div>

          <Button type="submit" className="w-full p-4 text-sm">
            변경하기
          </Button>
        </form>
      </div>
    </div>
  );
}
