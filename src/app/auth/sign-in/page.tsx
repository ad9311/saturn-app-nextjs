import Image from 'next/image';

import RenioFull from '@/assets/img/renio-full-neutral.svg';
import Renio from '@/assets/img/renio-neutral.svg';

import SignInButton from './SignInButton';

export default function SignInPage() {
  return (
    <>
      <div className="mt-20 mx-auto w-fit drop-shadow-lg">
        <Image
          src={RenioFull}
          alt="renio"
          height={150}
          style={{ height: 150 }}
          className="hidden rounded lg:block"
        />
        <Image
          src={Renio}
          alt="renio"
          width={150}
          height={150}
          style={{ width: 150, height: 150 }}
          className="rounded lg:hidden"
        />
      </div>
      <div className="card mt-20 mx-auto max-w-[34rem]" style={{ padding: '1.25rem' }}>
        <h1 className="title">Sign In</h1>
        <p className="subtitle">Sign in to renio using:</p>
        <ul className="mt-7">
          <li>
            <SignInButton />
          </li>
        </ul>
      </div>
    </>
  );
}
