export function MobileToast({ show }: { show: boolean }) {
  return (
    <div className={`m-toast${show ? " show" : ""}`}>
      <div className="m-toast-icon">🙏</div>
      <div>
        <div className="m-toast-title">Swap unlocked</div>
        <div className="m-toast-sub">Check your email for your free account</div>
      </div>
    </div>
  );
}
