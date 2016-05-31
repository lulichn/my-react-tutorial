package net.lulichn.react.server;

import io.vertx.core.AbstractVerticle;
import io.vertx.rxjava.core.Vertx;

public class Application extends AbstractVerticle {
	public static final void main(String[] args) {
		System.out.println("Hello");
	}

	public void start() {
		final Vertx rx = new Vertx(vertx);

		rx.deployVerticle(SimpleServer.class.getName());
	}
}
