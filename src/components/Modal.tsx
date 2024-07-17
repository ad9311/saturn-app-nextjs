import useModalStore from '@/stores/modal';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  children?: React.ReactNode;
}

export default function Modal({ id, children, ...props }: ModalProps) {
  const { modalsIds } = useModalStore(state => ({
    modalsIds: state.modalsIds,
  }));

  if (!modalsIds.includes(id)) return null;

  return (
    <div
      id={id}
      className="fixed top-0 left-0 right-0 h-full bg-neutral-700/40">
      <div className="mt-52">
        <div {...props}>{children}</div>
      </div>
    </div>
  );
}
