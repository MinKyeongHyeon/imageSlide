import ImageList from "./ImageList";
import "./App.css";

function App() {
  return (
    <>
      <ImageList />
    </>
  );
}

export default App;

// picsum api 사용 (https://picsum.photos/v2/list?page=2&limit=100)
// 최초 렌더링시 5개의 사진 리스트 출력
// 스크롤해서 하단에 닿았을때 추가적인 사진 데이터 호출
// useScrollObserver 커스텀 훅 활용
