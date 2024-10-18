import { z } from 'zod';

export const SignupFormSchema = z.object({
  nickname: z.string().min(1, '닉네임은 최소 1자 이상 입력해 주세요.').max(15, '닉네임은 최대 15자 이하로 입력해 주세요.'),
  bankName: z.string(),
  accountNumber: z
    .string()
    .regex(/^\d+$/, '계좌번호는 숫자만 입력할 수 있습니다.')
    .min(10, '계좌번호를 최소 10자 입력해주세요.')
    .max(14, '계좌번호는 최대 14자 이하로 입력해주세요.'),

  bio: z.string().optional(),
  link: z
    .string()
    .optional()
    .refine((value) => !value || /^(https?:\/\/)/.test(value), '링크는 http:// 또는 https://로 시작해야 합니다.'),
});

export const RegisterSchema = z.object({
  productName: z.string().min(2, '제목은 최소 2자 이상 입력해 주세요.').max(30, '제목은 최대 30자 이하로 입력해 주세요.'),
  images: z.array(z.string()).min(1, '사진은 최소 1장 이상 등록해 주세요.').max(5, '사진은 최대 5장 이하로 등록해 주세요.'),
  category: z.string().min(1, '카테고리를 선택해 주세요.'),
  minPrice: z.string().superRefine((value, ctx) => {
    const num = Number(value.replace(/[^\d]/g, ''));
    if (Number.isNaN(num) || num < 1000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '최소 1000원 이상 입력해 주세요.',
      });
    }

    if (num % 1000 !== 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '1000원 단위로 입력해 주세요.',
      });
    }
  }),
  description: z.string().min(5, '상품 설명은 최소 5자 이상 입력해 주세요.').max(1000, '상품 설명은 최대 1000자 이하로 입력해 주세요.').or(z.literal('')),
});

export const AuctionPaymentSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  address: z.string().min(1, '주소를 입력해주세요.'),
  bank: z.string().min(1, '은행을 선택해주세요.'),
});

export const getBidSchema = (minPrice: number) =>
  z.object({
    bidAmount: z.string().superRefine((value, ctx) => {
      const num = Number(value.replace(/[^\d]/g, ''));
      if (Number.isNaN(num) || num < minPrice) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `시작가보다 높은 금액을 입력해주세요.`,
        });
      }

      if (num % 1000 !== 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '1000원 단위로 입력해 주세요.',
        });
      }
    }),
  });
