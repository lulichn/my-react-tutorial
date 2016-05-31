package net.lulichn.react.server;

import io.vertx.core.Handler;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.rxjava.core.AbstractVerticle;
import io.vertx.rxjava.core.buffer.Buffer;
import io.vertx.rxjava.core.http.HttpServer;
import io.vertx.rxjava.ext.web.Router;
import io.vertx.rxjava.ext.web.RoutingContext;
import io.vertx.rxjava.ext.web.handler.StaticHandler;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;


public class SimpleServer extends AbstractVerticle {
	private static final String ASSETS_ROOT = "public/";
	private static final String COMMENTS_JSON = "comments.json";

	public void start() {
		Router router = Router.router(vertx);

		router.get("/api/comments").handler(handleGetComments());
		router.post("/api/comments").handler(handleSetComments());
		router.route("/*").handler(StaticHandler.create(ASSETS_ROOT).setCachingEnabled(false));

		HttpServer server = vertx.createHttpServer();
		server.requestHandler(router::accept).listen(3000);
	}

	private Handler<RoutingContext> handleGetComments() {
		return context -> {
			vertx.fileSystem().readFile(COMMENTS_JSON, ar -> {
				if(ar.succeeded()) {
					context.response().end(ar.result());
				} else {
					context.response().setStatusCode(400).end();
				}
			});
		};
	}

	private Handler<RoutingContext> handleSetComments() {
		return context -> {
			context.request().bodyHandler(body -> {
				Map<String, Object> formData = Arrays.stream(body.toString().split("&"))
					.map(v -> v.split("="))
					.collect(Collectors.toMap(v -> v[0], v -> v[1]));

				System.out.println(formData);
				JsonObject addItem = new JsonObject(formData);

				vertx.fileSystem().readFile(COMMENTS_JSON, ar -> {
					if (ar.succeeded()) {
						final JsonArray array = new JsonArray(ar.result().toString("UTF-8"));
						array.add(addItem);

						final Buffer result = Buffer.buffer(array.encode());
						vertx.fileSystem().writeFile(COMMENTS_JSON, result, wr -> {
							if (wr.succeeded()) {
								context.response().end(result);
							} else {
								context.response().setStatusCode(400).end();
							}
						});
					} else {
						context.response().setStatusCode(400).end();
					}
				});
			});
		};
	}
}
