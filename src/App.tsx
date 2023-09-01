import { useState, useEffect } from "react";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
export function App() {
  const now = new Date();
  //東大150周年
  const target = new Date("2027/4/12 0:00:00");
  const [remainTime, setRemainTime] = useState(
    target.getTime() - now.getTime()
  );
  //夏休みの残り日数
  const targetNatsuyasumi = new Date("2023/10/01 0:00:00");
  const beginNatsuyasumi = new Date("2023/8/01 0:00:00");
  const allNatsuyasumi =
    targetNatsuyasumi.getTime() - beginNatsuyasumi.getTime();
  const [remainNatsuyasumi, setRemainNatsuyasumi] = useState(
    targetNatsuyasumi.getTime() - now.getTime()
  );

  const [func, setFunc] = useState<number | string>(2);
  const selectChange = (e: SelectChangeEvent<number>) => {
    setFunc(e.target.value);
  };

  const [barWidth, setBarWidth] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      setRemainTime(target.getTime() - currentTime.getTime());
      setRemainNatsuyasumi(targetNatsuyasumi.getTime() - currentTime.getTime());
      // スタイルの更新
      setBarWidth(((allNatsuyasumi - remainNatsuyasumi) / allNatsuyasumi) * 99);
      console.log(barWidth);
    }, 1000);

    return () => {
      clearInterval(intervalId); // コンポーネントがアンマウントされる際にタイマーをクリア
    };
  }, []);

  if (remainTime < 0) {
    return null; // カウントダウン終了時のレンダリング
  }

  //東大150周年 func === 1
  const difDay1 = Math.floor(remainTime / 1000 / 60 / 60 / 24);
  const difHour1 = Math.floor(remainTime / 1000 / 60 / 60) % 24;
  const difMin1 = Math.floor(remainTime / 1000 / 60) % 60;
  const difSec1 = Math.floor(remainTime / 1000) % 60;

  //夏休みの残り日数 func === 2
  const difDay2 = Math.floor(remainNatsuyasumi / 1000 / 60 / 60 / 24);
  const difHour2 = Math.floor(remainNatsuyasumi / 1000 / 60 / 60) % 24;
  const difMin2 = Math.floor(remainNatsuyasumi / 1000 / 60) % 60;
  const difSec2 = Math.floor(remainNatsuyasumi / 1000) % 60;

  return (
    <>
      <h2>汎用カウントダウン</h2>
      <div className="input">
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel className="label">カウントダウン</InputLabel>
          <Select
            labelId="label"
            id="demo-simple-select"
            label="夏休みが終わるまで"
            onChange={selectChange}
          >
            <MenuItem value={1}>東大150周年まで</MenuItem>
            <MenuItem value={2}>夏休みが終わるまで</MenuItem>
          </Select>
        </FormControl>
      </div>
      {func === 1 && (
        <>
          <h3>東大150周年まで</h3>
          <div style={{ margin: 10 }}>
            あと
            <span className="card__utokyo__day">{difDay1}</span>日
            <span className="card__utokyo__day">{difHour1}</span>時間
            <span className="card__utokyo__day">{difMin1}</span>分
            <span className="card__utokyo__day">{difSec1}</span>秒
          </div>
          <p style={{ margin: 10 }}>
            ＊ 東大150周年：2027年4月12日に迎えます。
          </p>
        </>
      )}
      {func === 2 && (
        <>
          <h3>夏休みが終わるまで</h3>
          <div id="margin">
            {/* スタイルをステートで制御 */}
            <div id="bar" style={{ width: `${barWidth}%` }}></div>
          </div>
          <div style={{ margin: 10 }}>
            残り
            <span className="card__utokyo__day">{difDay2}</span>日
            <span className="card__utokyo__day">{difHour2}</span>時間
            <span className="card__utokyo__day">{difMin2}</span>分
            <span className="card__utokyo__day">{difSec2}</span>秒
          </div>
          <div style={{ margin: 10 }}>
            夏休みが
            <span className="card__utokyo__day">
              {Math.floor((barWidth / 99) * 10000) / 100}
            </span>
            % 終わりました。
          </div>
          <p style={{ margin: 10 }}>
            ＊ 夏休みの始まり：2023年8月1日、終わり：10月1日としています。
          </p>
        </>
      )}
      <p style={{ margin: 10 }}>
        ＊ 本サイトは、Javascriptフレームワークの一つであるReactを用いて作成しています。
      </p>
      <p style={{ margin: 10 }}>
        ＊ このサイトの制作者「かっちゃん」へのお問い合わせは
        <a
          href="https://random776.github.io/kacchan_home/contact"
          className="btn4"
        >
          こちら
        </a>
        から。
      </p>
    </>
  );
}

export default App;
