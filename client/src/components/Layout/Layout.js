import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";

import UserList from "../../pages/users/userList";
import userContact from "../../pages/users/userContact";

import ProductList from "../../pages/products/productList";
import ProductAddOrUpdate from "../../pages/products/productAddOrUpdate";

// added by : coding
import CategoryList from "../../pages/categories/categoryList";
import CategoryAdd  from "../../pages/categories/categoryAdd";

// added by coding
import OrderList from "../../pages/orders/orderList";

import BlogList from "../../pages/blogs/blogList";
import BlogAdd from "../../pages/blogs/blogAdd";

import ClientList from "../../pages/clients/clientList";
import ClientAdd from "../../pages/clients/clientAdd";

import TestimonialList from "../../pages/testimonials/testimonialList";
import TestimonialAdd from "../../pages/testimonials/testimonialAdd";

import WidgetList from "../../pages/widgets/widgetList";
import WidgetAdd from "../../pages/widgets/widgetAdd";

import FeatureList from "../../pages/features/featureList";
import FeatureAdd from "../../pages/features/featureAdd";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/typography" component={Typography} />
              <Route path="/app/tables" component={Tables} />
              <Route path="/app/notifications" component={Notifications} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />

              <Route path="/app/users" exact={true} component={UserList} />
              <Route path="/app/users/contact" exact={true} component={userContact} />
              <Route path="/app/products/list" component={ProductList} />

              {/* add by :  add category */}
              <Route path="/app/category/list" component={CategoryList} />
              <Route path="/app/category/add" component={CategoryAdd} />

              {/* added by : add orders*/}
              <Route path="/app/orders/list" component={OrderList} />

              <Route path="/app/blogs/list" component={BlogList} />
              <Route path="/app/blogs/add" component={BlogAdd} />

              <Route path="/app/clients/list" component={ClientList} />
              <Route path="/app/clients/add" component={ClientAdd} />

              <Route path="/app/testimonials/list" component={TestimonialList} />
              <Route path="/app/testimonials/add" component={TestimonialAdd} />

              <Route path="/app/widgets/list" component={WidgetList} />
              <Route path="/app/widgets/add" component={WidgetAdd} />

              <Route path="/app/features/list" component={FeatureList} />
              <Route path="/app/features/add" component={FeatureAdd} />

            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
