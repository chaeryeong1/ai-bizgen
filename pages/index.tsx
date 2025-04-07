import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [type, setType] = useState("문제인식");
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `${type} 항목에 대한 사업계획서를 작성해줘.\n설명: ${input}`,
      }),
    });
    const data = await res.json();
    setResult(data.result);
  };

  return (
    <main style={{ padding: 32, fontFamily: "sans-serif", maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>🧠 AI 사업계획서 생성기</h1>

      <label>항목 선택</label>
      <select value={type} onChange={(e) => setType(e.target.value)} style={{ marginBottom: 12 }}>
        <option>문제인식</option>
        <option>실현가능성</option>
        <option>차별성</option>
        <option>비즈니스모델</option>
        <option>시장전략</option>
      </select>

      <textarea
        rows={4}
        style={{ width: "100%", marginBottom: 12 }}
        placeholder="아이템이나 설명을 입력해주세요."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleGenerate} style={{ padding: 12, background: "#0070f3", color: "#fff", borderRadius: 6 }}>
        생성하기
      </button>

      {result && (
        <div style={{ marginTop: 24, background: "#f9f9f9", padding: 16, borderRadius: 8 }}>
          <h3>✅ 생성된 결과</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
        </div>
      )}
    </main>
  );
}
