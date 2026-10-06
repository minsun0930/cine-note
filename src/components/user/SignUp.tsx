import Button from "@/components/common/Button";
import { FormInput } from "@/components/common/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useSignUp } from "@/hooks/auth/useUserQuery";

const signUpSchema = z
  .object({
    nickname: z.string().min(2, "닉네임은 최소 2글자 이상이어야 합니다."),
    userId: z.email("올바른 이메일 형식을 입력해주세요."),
    password: z
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

    //필수 약관 동의 (반드시 체크되어 함)
    termsAgreed: z.boolean().refine((val) => val === true, {
      message: "필수 약관에 동의해주세요.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const { mutate: signUp } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      nickname: "",
      userId: "",
      password: "",
      confirmPassword: "",
      termsAgreed: false,
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    console.log("회원가입 제출 데이터:", data);
    signUp(data)
  }
   
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">회원가입</h1>
      <div className="text-[12px] my-3 break-keep text-gray-600">
        ※ 본 사이트는 포트폴리오 프로젝트입니다.<br/> 실제 사용 중인 
        이메일 주소나 민감한 개인정보를 입력하지 않도록 주의해 주세요.
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="pb-3.5 max-w-87">
        <div className="flex flex-col gap-3 mb-14">
          <FormInput
            placeholder="이름(닉네임)"
            type="text"
            registration={register("nickname")}
            error={errors.nickname?.message as string}
          />
          <FormInput
            placeholder="아이디(이메일)"
            type="email"
            registration={register("userId")}
            error={errors.userId?.message as string}
          />
          <div className="mb-2">
            <FormInput
              placeholder="비밀번호"
              type="password"
              registration={register("password")}
              error={errors.password?.message as string}
              helperText="※ 영문, 숫자, 특수문자(!@#$%^&*) 중 2개 이상 조합 (8~20자)"
            />
          </div>

          <FormInput
            type="password"
            placeholder="비밀번호 확인"
            registration={register("confirmPassword")}
            error={errors.confirmPassword?.message as string}
          />
          <div className="mb-4">
            <label className="text-sm flex items-center gap-1">
              <input type="checkbox" {...register("termsAgreed")} />
              <span className="text-xs">[필수] 서비스 이용약관 및 개인정보 수집에 동의합니다.</span>
            </label>
            <div className="h-6 mt-1 flex items-start">
              {errors.termsAgreed && (
                <p className="text-red-500 text-xs">
                  {errors.termsAgreed.message as string}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="transition disabled:opacity-50 disabled:bg-gray-400 w-full p-4 text-sm"
          >
            가입하기
          </Button>
        </div>
      </form>
    </div>
  );
}
