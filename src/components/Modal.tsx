import useModalStore from '@/stores/modal';

export default function Modal({
  id,
  children,
}: {
  id: string;
  children?: React.ReactNode;
}) {
  const { modalsIds } = useModalStore(state => ({
    modalsIds: state.modalsIds,
  }));

  if (!modalsIds.includes(id)) return null;

  return (
    <div
      id={id}
      className="fixed top-0 left-0 right-0 h-full bg-neutral-200/40">
      <div className="container mx-aut0 mt-60">{children}</div>
    </div>
  );
}
