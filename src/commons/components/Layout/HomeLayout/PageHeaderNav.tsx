import IconChevronRight from '@/commons/assets/icons/IconChevronRight';
import { Fragment } from 'react';

type PageHeaderNavProps = {
  navigations?: string[];
};

export default function PageHeaderNav({ navigations = [] }: PageHeaderNavProps) {
  return (
    <header className="fill-container page-header-nav">
      <section className="container">
        {navigations.length > 0 && (
          <p>
            {navigations.map((nav, i) =>
              i == navigations.length - 1 ? (
                <span className="last" key={i}>
                  {nav}
                </span>
              ) : (
                <Fragment key={i}>
                  {/* <Link to="/">{nav}</Link> */}
                  <span>{nav}</span>
                  <IconChevronRight width={'20'} height={'20'} />
                </Fragment>
              )
            )}
          </p>
        )}
      </section>
    </header>
  );
}
