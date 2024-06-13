import IconChevronRight from '@/commons/assets/icons/IconChevronRight';
import { Fragment, ReactNode } from 'react';
import {INavigation} from "@/types/global/navigation.ts";
import {Link} from "react-router-dom";

type PageHeaderProps = {
  title: string;
  navigations?: INavigation[];
  children?: ReactNode;
};

export default function PageHeader({ title, navigations = [], children }: PageHeaderProps) {
  return (
    <section className="fill-container page-header">
      <section className="container">
        <h1>{title}</h1>
        {navigations.length > 0 && (
          <p>
            {navigations.map((nav, i) =>
              i == navigations.length - 1 ? (
                <span className="last" key={i}>
                  {nav.label}
                </span>
              ) : (
                <Fragment key={i}>
                  <Link to={nav.link ?? '/'}>{nav.label}</Link>
                  <IconChevronRight width={'25'} height={'25'} />
                </Fragment>
              )
            )}
          </p>
        )}
        {children}
      </section>
      <img
        src={`${import.meta.env.VITE_APP_URL}/images/pattern-left.png`}
        alt={`${import.meta.env.VITE_APP_NAME} - Pattern Left `}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
        }}
      />
      <img
        src={`${import.meta.env.VITE_APP_URL}/images/pattern-right.png`}
        alt={`${import.meta.env.VITE_APP_NAME} - Pattern Right `}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
        }}
      />
    </section>
  );
}
