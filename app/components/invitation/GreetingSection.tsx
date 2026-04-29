import { InvitationConfig } from '@/types/invitation';

interface GreetingProps {
  config: InvitationConfig;
}

export function GreetingSection({ config }: GreetingProps) {
  const defaultGreeting =
    '두 사람이 함께 만들어갈\n새로운 인생의 첫 발걸음에\n부디 함께해 주시길 바랍니다.';

  return (
    <section className="inv-section" style={{position: 'relative', paddingBottom: '80px'}}>
      <div className="inv-container">
        <p className="inv-greeting__title">소중한 분들께</p>
        <p className="inv-greeting">
          {config.greetingMessage || defaultGreeting}
        </p>
      </div>

    </section>
  );
}
