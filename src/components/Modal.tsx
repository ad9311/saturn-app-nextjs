'use client';

import useModalStore from '@/stores/modal';

export default function Modal() {
  const { children } = useModalStore(state => ({
    children: state.children,
  }));

  if (children === null) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-full bg-neutral-700/40">
      <div className="mt-52">{children}</div>
    </div>
  );
}
