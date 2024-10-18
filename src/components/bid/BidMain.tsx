import { getBidSchema } from "@/constants/schema";
import { useEditableNumberInput } from "@/hooks/useEditableNumberInput";
import { convertCurrencyToNumber } from "@/utils/convertCurrencyToNumber";
import { formatCurrencyWithWon } from "@/utils/formatCurrencyWithWon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import FormField from "../common/form/FormField";
import AuctionItem from "../common/item/AuctionItem";
import { useGetAuctionDetails } from "../details/queries";
import Layout from "../layout/Layout";
import { Input } from "../ui/input";
import BidCaution from "./BidCaution";
import BidFooter from "./BidFooter";
import { usePostBid } from "./queries";

const BidMain = ({ auctionId }: { auctionId: number }) => {
  const { auctionDetails } = useGetAuctionDetails(auctionId);
  const { mutate: postBid } = usePostBid(auctionId);
  const [check, setCheck] = useState<boolean>(false);
  const toggleCheckBox = () => setCheck((state) => !state);

  const { imageUrls, productName, minPrice, participantCount, remainingBidCount, bidAmount, timeRemaining, isParticipated } = auctionDetails;
  const BidSchema = getBidSchema(minPrice);
  type FormFields = z.infer<typeof BidSchema>;

  const {
    control,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: { bidAmount: '' },
    resolver: zodResolver(BidSchema),
  });

  const { isEditing, handleBlur, handleFocus } = useEditableNumberInput({
    name: 'bidAmount',
    setValue,
    getValues,
  });

  const onPostSubmit: SubmitHandler<FormFields> = async (data) => {
    const bidData = {
      auctionId: Number(auctionId),
      bidAmount: convertCurrencyToNumber(data.bidAmount),
    };

    postBid(bidData);
  };
  return (
    <>
      <Layout.Main>
        <div className='flex flex-col gap-8'>
          <AuctionItem axis='row' label='입찰 상품'>
            <AuctionItem.Image src={imageUrls[0]} time={timeRemaining} />
            <AuctionItem.Main kind='register' name={productName} count={participantCount} price={minPrice} />
          </AuctionItem>
          {isParticipated && (
            <div className='flex flex-col gap-2'>
              <div className='text-heading3'>나의 참여 금액</div>
              <div aria-label='나의 참여 금액' className='text-body1Bold text-cheeseYellow'>
                {formatCurrencyWithWon(bidAmount)}
              </div>
            </div>
          )}
          <FormField
            label='가격 제안하기'
            name='bidAmount'
            control={control}
            error={errors.bidAmount?.message}
            render={(field) => (
              <Input
                id='가격 제안하기'
                type={isEditing ? 'number' : 'text'}
                placeholder={`최소 입찰가는 ${formatCurrencyWithWon(minPrice)} 입니다.`}
                className=' focus-visible:ring-cheeseYellow'
                {...field}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
            )}
          />
          <BidCaution check={check} handleCheck={toggleCheckBox} />
        </div>
      </Layout.Main>
      <Layout.Footer type={isParticipated ? 'double' : 'single'}>
        <BidFooter remain={remainingBidCount} check={check} isSubmitting={isSubmitting} handlePost={handleSubmit(onPostSubmit)} />
      </Layout.Footer>
    </>
  );
}

export default BidMain;
