import { AddresDetail } from "@/@types/Address";
import Button from "@/components/common/Button";
import FormField from "@/components/common/form/FormField";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const DeliveryAddressAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roadAddress, zonecode } = location.state;
  const formRef = useRef<HTMLFormElement>(null);
  const [isChecked, _setIsChecked] = useState(false);

  const {
    control,
    watch,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<AddresDetail>({
    defaultValues: {
      name: '',
      phoneNumber: '',
      zonecode: zonecode,
      address: roadAddress,
      addressDetail: '',
    }
  });

  const phoneNumber = watch('phoneNumber');

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    // 코드 다시 손봐야함
    setValue('defaultAddress', checked ? 'true' : 'false');
  };

  const onSubmit = handleSubmit((data: AddresDetail) => {
    console.log(data);
  });

  const handleOpenAddress = () => {
    new window.daum.Postcode({
      onComplete: (data: any) => {
        const roadAddress = data.address;
        const { zonecode } = data;

        setValue('zonecode', zonecode);
        setValue('address', roadAddress);

        navigate('/auctions/address-add', { state: { roadAddress, zonecode } });
      },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = import.meta.env.VITE_SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    setValue('phoneNumber', formattedPhoneNumber);
  }, [phoneNumber, setValue]);

  return (
    <Layout>
      <Layout.Header title="배송지 추가" handleBack={() => navigate('/')} />
      <Layout.Main>
        <div className="flex flex-col">
          <form ref={formRef} className="flex flex-col gap-6" onSubmit={onSubmit}>
            <FormField
              label="이름"
              name="name"
              control={control}
              error={errors.address?.message}
              render={(field) => (
                <Input
                  id="이름"
                  type="text"
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                />
              )}
            />
            <FormField
              label="연락처"
              name="phoneNumber"
              control={control}
              error={errors.address?.message}
              render={(field) => (
                <Input
                  id="연락처"
                  type="text"
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                />
              )}
            />
            <div className="flex item-center gap-6">
              <label className="flex items-center w-[100px] font-bold">우편번호</label>
              <Input
                id="우편번호"
                type="text"
                value={zonecode}
                className="focus-visible:ring-cheeseYellow bg-gray3"
                readOnly
              />
              <Button type="button" size="small" className="w-[150px] h-[40px]" onClick={handleOpenAddress}>
                우편번호 찾기
              </Button>
            </div>
            <FormField
              label="주소지"
              name="address"
              control={control}
              error={errors.address?.message}
              render={(field) => (
                <Input
                  id="주소지"
                  type="text"
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                />
              )}
            />
            <FormField
              label="상세주소"
              name="addressDetail"
              control={control}
              error={errors.address?.message}
              render={(field) => (
                <Input
                  id="상세주소"
                  type="text"
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                />
              )}
            />
            {/* 기본 배송지 체크박스는 직접 처리 */}
            <div className="flex items-center space-x-3">
              <input
                id="defaultAddress"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-cheeseYellow border-gray-300 rounded focus:ring-cheeseYellow"
              />
              <label htmlFor="defaultAddress" className="text-lg text-gray-3 text-center">
                기본 배송지로 설정
              </label>
            </div>
          </form>
        </div>
      </Layout.Main>
      <Layout.Footer type="single">
        <Button type="submit" className="w-full h-[47px] rounded-lg" color="cheeseYellow" onClick={handleSubmitClick}>
          저장하기
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export default DeliveryAddressAdd;