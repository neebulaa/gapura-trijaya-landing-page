import IconChevronRight from '@/commons/assets/icons/IconChevronRight';
import { Fragment } from 'react';
import {Link} from "react-router-dom";
import {INavigation} from "@/types/global/navigation.ts";

type PageHeaderNavProps = {
  navigations?: INavigation[]
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
                  {nav.label}
                </span>
              ) : (
                <Fragment key={i}>
                   <Link to={nav.link ?? '/'}>{nav.label}</Link>
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
