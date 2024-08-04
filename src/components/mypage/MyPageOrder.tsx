const MyPageOrder = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">모든 참여 내역</h3>
      <div className="bg-gray-300 p-2 rounded-md">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            참여한
            <br /> 경매
          </div>
          <div>
            경매 참여
            <br /> 성공
          </div>
          <div>
            경매 참여
            <br /> 실패
          </div>
          <div>
            종료된
            <br /> 경매
          </div>
          <div className="col-span-1">-</div>
          <div className="col-span-1">-</div>
          <div className="col-span-1">1</div>
          <div className="col-span-1">1</div>
        </div>
      </div>
    </div>
  );
};

export default MyPageOrder;
