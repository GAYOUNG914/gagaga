'use client';

import { useState } from 'react';

interface Account {
  bank: string;
  accountHolder: string;
  accountNumber: string;
}

const IconCopy = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

function AccountRow({ label, account }: { label: string; account: Account }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `${account.bank} ${account.accountNumber}`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const el = document.createElement('textarea');
        el.value = text;
        el.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="inv-account-row">
      <div className="inv-account-row__top">
        <span className="inv-account-row__label">{label}</span>
        <span className="inv-account-row__holder">{account.accountHolder}</span>
      </div>
      <div className="inv-account-row__bottom">
        <span
          className="inv-account-row__number"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: `${account.bank}&nbsp;&nbsp;${account.accountNumber}` }}
        />
        <button
          className={`inv-account-row__copy${copied ? ' inv-account-row__copy--done' : ''}`}
          onClick={handleCopy}
          style={{fontFamily: 'NotoSansKR', fontWeight: '400'}}
        >
          {copied ? '✓ 복사됨' : <><IconCopy /> 복사</>}
        </button>
      </div>
    </div>
  );
}

function AccountGroup({ title, items }: { title: string; items: { label: string; account: Account }[] }) {
  return (
    <div className="inv-account-group">
      <p className="inv-account-group__title">{title}</p>
      <div className="inv-account-group__list">
        {items.map(({ label, account }) => (
          <AccountRow key={label} label={label} account={account} />
        ))}
      </div>
    </div>
  );
}

interface AccountsSectionProps {
  groomAccount?: Account;
  groomFatherAccount?: Account;
  groomMotherAccount?: Account;
  brideAccount?: Account;
  brideFatherAccount?: Account;
  brideMotherAccount?: Account;
}

export function AccountsSection({
  groomAccount,
  groomFatherAccount,
  groomMotherAccount,
  brideAccount,
  brideFatherAccount,
  brideMotherAccount,
}: AccountsSectionProps) {
  const groomItems = [
    groomAccount       && { label: '신랑',       account: groomAccount },
    groomFatherAccount && { label: '신랑 아버지', account: groomFatherAccount },
    groomMotherAccount && { label: '신랑 어머니', account: groomMotherAccount },
  ].filter(Boolean) as { label: string; account: Account }[];

  const brideItems = [
    brideAccount       && { label: '신부',       account: brideAccount },
    brideFatherAccount && { label: '신부 아버지', account: brideFatherAccount },
    brideMotherAccount && { label: '신부 어머니', account: brideMotherAccount },
  ].filter(Boolean) as { label: string; account: Account }[];

  if (!groomItems.length && !brideItems.length) return null;

  return (
    <section className="inv-section" style={{position:'relative'}}>
      <div className="inv-container">
        <h2 className="inv-title" data-aos="fade-in">마음 전하실 곳</h2>
        <div className="inv-accounts" data-aos="fade-in" data-aos-delay="100">
          {groomItems.length > 0 && (
            <AccountGroup title="신랑측" items={groomItems} />
          )}
          {brideItems.length > 0 && (
            <AccountGroup title="신부측" items={brideItems} />
          )}
        </div>
      </div>

      <div className="inv-torn">
        <img src="/images/torn_paper.webp" alt="" />
      </div>
    </section>
  );
}
