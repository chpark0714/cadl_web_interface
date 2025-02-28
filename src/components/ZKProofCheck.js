import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as snarkjs from 'snarkjs';
import './ZKProofCheck.css';

function ZKProofCheck() {
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const targetPath = location.state?.from || '/';

  async function verifyProof() {
    setIsVerifying(true);
    try {
      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        {
          "pks": ["10", "20", "30"],
          "c": ["5", "21", "52"],
          "s": ["6", "11", "20"],
          "q": ["0", "0", "1"]
        },
        "/circuits/ring-sig.wasm",
        "/circuits/ring-sig_0001.zkey"
      );

      console.log("Original proof:", proof);

      // 새로운 proof 데이터 구조로 재구성
      const proofData = {
        pA: [
          proof.pi_a[0],
          proof.pi_a[1]
        ],
        pB: [
          [
            proof.pi_b[0][0],
            proof.pi_b[0][1]
          ],
          [
            proof.pi_b[1][0],
            proof.pi_b[1][1]
          ]
        ],
        pC: [
          proof.pi_c[0],
          proof.pi_c[1]
        ],
        pubSignals: publicSignals
      };

      console.log("\n=== Formatted Proof Data ===");
      console.log("pA:", proofData.pA);
      console.log("pB:", proofData.pB);
      console.log("pC:", proofData.pC);
      console.log("Public Signals:", proofData.pubSignals);

      const vkeyResponse = await fetch("/circuits/verification_key.json");
      const vkey = await vkeyResponse.json();

      // 새로운 구조로 검증
      const res = await snarkjs.groth16.verify(vkey, proofData.pubSignals, {
        pi_a: [...proofData.pA, "1"],
        pi_b: [
          proofData.pB[0],
          proofData.pB[1],
          ["1", "0"]
        ],
        pi_c: [...proofData.pC, "1"],
        protocol: "groth16",
        curve: "bn128"
      });
      
      console.log("\n=== Verification Result ===");
      console.log("Result:", res);

      if (res) {
        sessionStorage.setItem('zkProofVerified', 'true');
        navigate(targetPath);
      } else {
        alert("ZK Proof verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Verification error: " + error.message);
    } finally {
      setIsVerifying(false);
    }
  }

  return (
    <div className="zkproof-container">
      <div className="zkproof-content">
        <h2>ZK Proof Verification</h2>
        <div className="verification-section">
          <p>Verify your zero-knowledge proof here</p>
          <button 
            onClick={verifyProof} 
            disabled={isVerifying}
            className={isVerifying ? 'verifying' : ''}
          >
            {isVerifying ? 'Verifying...' : 'Verify ZK Proof'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ZKProofCheck; 