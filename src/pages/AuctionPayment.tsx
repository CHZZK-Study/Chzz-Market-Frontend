import { useNavigate, useParams } from 'react-router-dom';
import Button from '@/components/common/Button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import FormField from '@/components/common/form/FormField';
import { Input } from '@/components/ui/input';
import { ChevronDown } from 'lucide-react';
import SelectBank from '@/components/profile/SelectBank';
import { useRef, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { usePostOrderId } from '@/hooks/usePayment';
import { AuctionPaymentSchema } from '@/constants/schema';

type FormFields = z.infer<typeof AuctionPaymentSchema>;

const defaultValues = {
  name: '',
  address: '',
  bank: '',
};

const AuctionPayment = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const { auctionId } = useParams<{ auctionId: string }>();
  if (!auctionId) {
    return;
  }
  const { mutate: postOrderId, addressData } = usePostOrderId(auctionId);

  const [bank, setBank] = useState('');
  const [activeButtonSheet, setActiveButtonSheet] = useState(false);

  const {
    control,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues,
  });

  const onCloseBottomSheet = () => {
    setActiveButtonSheet(!activeButtonSheet);
  };

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  const onSubmit = () => {
    postOrderId();
  };

  return (
    <Layout>
      <Layout.Header title="결제하기" handleBack={() => navigate('/')} />
      <Layout.Main>
        <div className="space-y-6">
          {/* 기본 정보 입력 */}
          <div className="p-4 space-y-2 rounded-lg">
            <h2 className="text-lg font-semibold">기본 정보 입력</h2>
            {/* 상품 정보 */}
            <div className="flex p-2 space-x-4">
              <img
                src={addressData.imageUrl}
                alt="product"
                className="object-cover rounded-md w-28 h-28 xs:w-24 xs:h-24"
              />
              <div>
                <p className="font-bold">{addressData.productName}</p>
                <p className="heading3 font-semibold">{`시작가: ${addressData.minPrice}원`}</p>
                <p className="heading3 font-semibold"> {`참여자 수: ${addressData.participantCount}명`}</p>
              </div>
            </div>
          </div>

          {/* 수령자 정보 입력 */}
          <form
            ref={formRef}
            className="flex flex-col gap-6"
            onSubmit={onSubmit}>
            <FormField
              label="이름*"
              name="name"
              control={control}
              error={errors.name?.message}
              render={(field) => (
                <Input
                  id="이름*"
                  type="text"
                  placeholder="이름을 입력해주세요."
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                />
              )}
            />
            <div className="relative">
              <FormField
                label="수령지 입력*"
                name="address"
                control={control}
                error={errors.address?.message}
                render={(field) => (
                  <Input
                    id="수령지 입력*"
                    type="text"
                    placeholder="이름을 입력해주세요."
                    className="focus-visible:ring-cheeseYellow"
                    {...field}
                  />
                )}
              />
              <Button
                className="absolute right-1 bottom-[5px]"
                type="button"
                color="white"
                size="small"
              >
                주소 입력
              </Button>
            </div>

            <h3 className="text-heading3">결제 방법</h3>
            <div className="flex space-x-4">
              <Button type="button" className="rounded" color="black">
                무통장 입금
              </Button>
              <Button type="button" className="rounded">
                퀵 계좌결제
              </Button>
            </div>

            <div
              className="relative"
              onClick={() => setActiveButtonSheet(!activeButtonSheet)}
            >
              <FormField
                label="은행 *"
                name="bank"
                control={control}
                error={errors.bank?.message}
                render={(field) => (
                  <Input
                    id="은행 *"
                    placeholder="은행을 선택해주세요"
                    className="focus-visible:ring-cheeseYellow"
                    {...field}
                    value={bank}
                  />
                )}
              />
              <ChevronDown
                className="text-gray-400 text-2xl absolute right-2 bottom-2.5"
                data-testid="bank-dropdown-icon"
              />
            </div>
            {activeButtonSheet && (
              <SelectBank
                onClose={onCloseBottomSheet}
                onSelect={(el) => setBank(el)}
              />
            )}
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="receipt" className="mr-2" />
                <label htmlFor="receipt" className="text-sm">
                  현금 영수증 신청
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="agree" className="mr-2" />
                <label htmlFor="agree" className="text-sm">
                  주의사항을 모두 확인하였으며 위 내용에 동의합니다.
                </label>
              </div>
            </div>
          </form>
        </div>
      </Layout.Main>
      <Layout.Footer type="single">
        <Button
          type="submit"
          className="w-full h-[47px] rounded-lg"
          color="cheeseYellow"
          onClick={handleSubmitClick}
        >
          결제 하기
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export default AuctionPayment;
